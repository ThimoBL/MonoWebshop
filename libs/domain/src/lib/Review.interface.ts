import {User} from "@mono-webshop/domain";

export interface Review {
  id: number;
  title: string;
  description: string;
  rating: number;
  product: number;
  user: User;
}
