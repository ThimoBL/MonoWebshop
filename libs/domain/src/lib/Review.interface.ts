import {User} from "@mono-webshop/domain";

export interface Review {
  _id?: string;
  title: string;
  description: string;
  rating: number;
  product: string;
  createdBy: User;
}
