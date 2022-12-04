import {Injectable} from "@angular/core";
import {Role, User} from "@mono-webshop/domain";

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly users: User[];

  constructor() {
    this.users = [{
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
      role: Role.Admin,
      reviews: [],
      orders: []
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
      role: Role.User,
      reviews: [],
      orders: []
    }];
  }

  public list(): User[] {
    return this.users;
  }

  public get(id: number): User {
    return this.users.filter((user => user.id === id))[0];
  }

  public async findEmail(email: string): Promise<User | undefined> {
    return this.users.filter((user => user.email === email))[0];
  }

  public create(user: User): User {
    user.id = this.users.length + 1;
    this.users.push(user);
    return user;
  }

  public update(id: number, user: User): User {
    const index = this.users.findIndex((user => user.id === id));
    this.users[index] = user;
    return user;
  }

  public delete(id: number): void {
    const index = this.users.findIndex((user => user.id === id));
    this.users.splice(index, 1);
  }
}
