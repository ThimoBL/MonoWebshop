import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { v4 as uuid } from 'uuid';
import { Document } from 'mongoose';

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
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
