import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as MongooseSchema} from "mongoose";
import {v4 as uuid} from 'uuid';
import {Product} from "./product.schema";
import {User} from "./user.schema";

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({
    default: uuid
  })
  _id: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    type: Number,
    validate: {
      validator: function(rating) {
        return rating >= 1 && rating <= 5
      },
      message: props => `${props.value} is not a valid rating. Rating must be between 1 and 5`
    },
    required: true,
    default: 1
  })
  rating: number;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Product'
  })
  product: Product;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User'
  })
  createdBy: User;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
