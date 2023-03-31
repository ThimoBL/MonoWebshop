import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { v4 as uuid } from 'uuid';
import { Document } from 'mongoose';
import {Product} from "./product.schema";

export type ManufacturerDocument = Manufacturer & Document;

@Schema()
export class Manufacturer {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  city: string;

  @Prop({
    required: true,
  })
  country: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  phone: string;

  @Prop({ default: [] })
  products: Product[]

  @Prop({
    required: true,
  })
  createdBy: string;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
