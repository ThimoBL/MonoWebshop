import {Role} from "./Role.enum";
import {Review} from "./Review.interface";
import {Order} from "./Order.interface";

export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  roles: Role[];
  reviews: Review[] | null;
  orders: Order[] | null;
}
