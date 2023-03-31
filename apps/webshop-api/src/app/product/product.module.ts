import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductSchema} from "../schemas/product.schema";
import {ProductController} from "./product.controller";

@Module({
  controllers: [],
  providers: [],
})
export class ProductModule {}
