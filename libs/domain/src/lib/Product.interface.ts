import {Review} from "./Review.interface";

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  size: string;
  reviews: Review[];
  manufacturer: string;
  createdBy: string;
}
