import { Injectable } from '@nestjs/common';
import {Role} from "@mono-webshop/domain";

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [{
    id: 1,
    email: 'example@gmail.com',
    password: 'PassWord123',
    firstName: 'firstName',
    lastName: 'lastName',
    address: 'address 12',
    city: 'city',
    zipCode: '1234AB',
    country: 'country',
    phone: '0612345678',
    role: Role.Admin
  }, {
    id: 2,
    email: 'example2@gmail.com',
    password: 'PassWord123',
    firstName: 'firstName',
    lastName: 'lastName',
    address: 'address 12',
    city: 'city',
    zipCode: '1234AB',
    country: 'country',
    phone: '0612345678',
    role: Role.User
  }];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.email === username);
  }
}
