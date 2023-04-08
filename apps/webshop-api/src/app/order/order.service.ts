import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";
import {Order, User} from "@mono-webshop/domain";
import {Neo4jService} from "nest-neo4j/dist";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly neo4jService: Neo4jService,
  ) {
  }

  async list(): Promise<Order[]> {
    return this.userModel.find<Order>({}, {_id: 0, orders: 1}).exec();
  }

  async get(id: string): Promise<Order> {
    return this.userModel.findOne<Order>({_id: id}, {_id: 0, orders: 1}).exec()
  }

  async listByUser(id: string): Promise<Order> {
    return this.userModel.findOne<Order>({_id: id}, {_id: 0, orders: 1}).exec()
  }

  async create(order: Order): Promise<any> {
    let objectId = new mongoose.Types.ObjectId();

    await this.neo4jService.write(`
      MATCH (n1), (n2)
      WHERE n1.id = $product AND n2.id = $user
      CREATE (n1)-[r:ORDERED_BY {id: $id}]->(n2)
    `, {
      id: objectId.toString(),
      user: order.createdBy,
      product: order.orderItems._id
    });

    return await this.userModel.findOneAndUpdate(
      {_id: order.createdBy},
      {
        $addToSet: {
          orders: {
            _id: objectId,
            orderDate: order.orderDate,
            orderNumber: order.orderNumber,
            status: order.status,
            total: order.total,
            createdBy: order.createdBy,
            orderItems: order.orderItems,
          }
        }
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }).exec();
  }

  async update(id: string, order: Order): Promise<Order> {
    const existingUser = this.userModel.findOneAndUpdate<Order>(
      {_id: order.createdBy},
      {
        $set:
          {"orders.$[elem]": order}
      }
    );
    if (!existingUser) throw Error('User does not exist');

    return existingUser;
  }

  async delete(id: string): Promise<boolean> {
    return this.userModel.deleteOne(
      {
        orders:
          {
            $elemMatch:
              {_id: id}
          }
      }).then(
      () =>
        Promise
          .resolve(
            true
          ));
  }
}
