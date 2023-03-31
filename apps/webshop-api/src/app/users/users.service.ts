import {Injectable, Logger} from '@nestjs/common';
import {Role, User} from "@mono-webshop/domain";
import {InjectModel} from "@nestjs/mongoose";
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectModel('User') private userModel: Model<User>,
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

  async initUsers() {
    return this.userModel.insertMany(this.users);
  }
}
