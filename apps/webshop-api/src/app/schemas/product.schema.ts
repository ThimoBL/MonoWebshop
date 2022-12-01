import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import {Manufacturer} from "./manufacturer.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({default: uuid, index: true})
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  image: string;

  @Prop()
  size: string;

  @Prop({
    required: true,
    type: {
      id: String,
      name: String,
      description: String,
      image: String
    }
  })
  manufacturer: Manufacturer;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
