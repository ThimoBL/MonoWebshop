import { Product } from "./Product.interface";

export interface Manufacturer {
  _id?: string;
  name: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  products: Product[];
  createdBy: string;
}
