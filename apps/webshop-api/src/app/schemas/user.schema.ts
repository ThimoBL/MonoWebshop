import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as MongooseSchema} from "mongoose";
import {v4 as uuid} from 'uuid';
import { Order } from "./order.schema";
import {Review} from "./review.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    required: true,
  })
  address: string;

  @Prop({
    required: true,
  })
  city: string;

  @Prop({
    required: true,
  })
  zipCode: string;

  @Prop({
    required: true
  })
  country: string;

  @Prop({
    required: true
  })
  phone: string;

  @Prop({
    required: true
  })
  roles: string[];

  @Prop({
    required: false,
    type: [MongooseSchema.Types.ObjectId],
    default: [],
    ref: 'Review'
  })
  reviews: []

  @Prop({
    required: true,
    default: []
  })
  orders: Order[]
}

export const UserSchema = SchemaFactory.createForClass(User);
