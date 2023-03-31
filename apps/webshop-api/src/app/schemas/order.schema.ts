import {Prop, SchemaFactory} from "@nestjs/mongoose";
import {v4 as uuid} from 'uuid';
import {Document} from "mongoose";
import { Product } from "./product.schema";

export type OrderDocument = Order & Document;

export class Order {
  @Prop({default: uuid})
  id: string;

  @Prop({
    required: true,
    default: new Date()
  })
  orderDate: Date;

  @Prop({
    required: true,
  })
  orderNumber: string;

  @Prop({
    required: true,
  })
  status: string;

  @Prop({
    required: true,
  })
  Total: number;

  @Prop({
    required: true,
  })
  createdBy: string;

  @Prop({
    required: true,
    default: [],
  })
  orderItems: Product[]
}

export const OrderSchema = SchemaFactory.createForClass(Order);
