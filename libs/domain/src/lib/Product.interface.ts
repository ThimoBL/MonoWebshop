import { Manufacturer } from "./Manufacturer.interface";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  size: string;
  manufacturer: Manufacturer;
}
