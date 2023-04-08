import {Injectable, Logger} from '@nestjs/common';
import {Role, User} from "@mono-webshop/domain";
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from 'mongoose';
import {Neo4jService} from "nest-neo4j/dist";

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly neo4jService: Neo4jService,
  ) {
    this.users = [{
      _id: new mongoose.Types.ObjectId().toString(),
      email: 'example@gmail.com',
      password: 'PassWord123',
      firstName: 'firstName',
      lastName: 'lastName',
      address: 'address 12',
      city: 'city',
      zipCode: '1234AB',
      country: 'country',
      phone: '0612345678',
      roles: [Role.Admin],
      reviews: [],
      orders: []
    }, {
      _id: new mongoose.Types.ObjectId().toString(),
      email: 'example2@gmail.com',
      password: 'PassWord123',
      firstName: 'firstName',
      lastName: 'lastName',
      address: 'address 12',
      city: 'city',
      zipCode: '1234AB',
      country: 'country',
      phone: '0612345678',
      roles: [Role.User],
      reviews: [],
      orders: []
    }];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne<User>({
      email: username
    }).lean().exec();
  }

  async test() {
    return 'test';
  }

  async initUsers() {
    Logger.log('Init users');

    //INSERT USERS TO NEO4J
    for (const user of this.users) {
      const createUsers = await this.neo4jService.write(`
        CREATE (u:User {id: $id, name: $name})
        RETURN u
      `, {
        id: user._id,
        name: user.firstName
      });
    }

    //INSERT USERS TO MONGO
    return await this.userModel.insertMany(this.users);
  }
}
