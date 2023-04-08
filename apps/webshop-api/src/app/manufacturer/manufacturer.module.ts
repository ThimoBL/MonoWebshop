import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import {ManufacturerController} from "./manufacturer.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {ManufacturerSchema} from "../schemas/manufacturer.schema";
import {ProductController} from "../product/product.controller";
import {ProductService} from "../product/product.service";
import {ReviewController} from "../review/review.controller";
import {ReviewService} from "../review/review.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Manufacturer', schema: ManufacturerSchema }])],
  controllers: [ManufacturerController, ProductController],
  providers: [ManufacturerService, ProductService],
  exports: [ManufacturerService, ProductService]
})
export class ManufacturerModule {}
