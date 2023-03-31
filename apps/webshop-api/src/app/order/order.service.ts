import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";
import {Order, User} from "@mono-webshop/domain";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
  ) {
  }

  async list(): Promise<Order[]> {
    return this.userModel.find<Order>({}, {_id: 0, orders: 1}).exec();
  }

  async get(id: string): Promise<Order> {
    return this.userModel.findOne<Order>({_id: id}, {_id: 0, orders: 1}).exec()
  }

  async create(order: Order): Promise<any> {
    order._id = new mongoose.Types.ObjectId().toString();

    const existingUser = await this.userModel.findById(order.createdBy);
    if (!existingUser) throw Error('User does not exist');

    existingUser.orders.push(order);

    return existingUser.save();
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
