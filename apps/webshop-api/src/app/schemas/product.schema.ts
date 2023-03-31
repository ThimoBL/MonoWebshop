import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Schema as MongooseSchema} from 'mongoose';
import {v4 as uuid} from 'uuid';
import {Manufacturer} from "./manufacturer.schema";
import { Review } from "./review.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({
    required: true,
    default: uuid,
  })
  _id: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop()
  image: string;

  @Prop({
    required: true,
  })
  size: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Manufacturer'
  })
  manufacturer: Manufacturer;

  @Prop({
    required: true,
  })
  createdBy: string;

  @Prop({
    required: true,
    default: []
  })
  reviews: Review[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
