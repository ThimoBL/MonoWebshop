import {Product, User} from "@mono-webshop/domain";

export interface Order {
  _id: string;
  orderDate: Date;
  orderNumber: string;
  Status: string;
  Total: number;
  createdBy: string;
  orderItems: Product[];
}
