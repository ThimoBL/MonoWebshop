import {Product, User} from "@mono-webshop/domain";

export interface Order {
  _id?: string;
  orderDate: Date;
  orderNumber: string;
  status: string;
  total: number;
  createdBy: string;
  orderItems: Product;
}
