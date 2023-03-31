import { Module } from '@nestjs/common';
import {ReviewService} from "./review.service";
import {MongooseModule} from "@nestjs/mongoose";
import {ReviewSchema} from "../schemas/review.schema";
import {ReviewController} from "./review.controller";

@Module({
  controllers: [],
  providers: []
})
export class ReviewModule {}
