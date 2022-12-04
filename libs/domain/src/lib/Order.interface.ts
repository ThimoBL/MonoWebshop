import {Product, User} from "@mono-webshop/domain";

export interface Order {
  id: number;
  orderDate: Date;
  orderNumber: string;
  Status: string;
  Total: number;
  user: User;
  orderItems: Product[];
}
