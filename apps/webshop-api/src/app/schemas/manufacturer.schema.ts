import {Prop, Schema} from "@nestjs/mongoose";
import { v4 as uuid } from 'uuid';
import { Document, Schema as MongooseSchema } from 'mongoose';

import {Product} from "./product.schema";

export type ManufacturerDocument = Manufacturer & Document;

@Schema()
export class Manufacturer {
  @Prop({default: uuid, index: true})
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({
    default: [],
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Product',
  })
  products: Product[];
}
