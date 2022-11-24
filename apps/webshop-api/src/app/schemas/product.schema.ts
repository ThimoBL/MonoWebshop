import {Prop, Schema} from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
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
    default: [],
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Manufacturer',
  })
  manufacturer: Manufacturer;
}
