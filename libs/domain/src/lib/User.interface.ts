import {Role} from "./Role.enum";
import {Review} from "./Review.interface";
import {Order} from "./Order.interface";

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  role: Role;
  reviews: Review[] | null;
  orders: Order[] | null;
}
