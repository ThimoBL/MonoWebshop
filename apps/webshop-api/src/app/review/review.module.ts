import {Module} from '@nestjs/common';
import {ReviewService} from "./review.service";
import {MongooseModule} from "@nestjs/mongoose";
import {ReviewSchema} from "../schemas/review.schema";
import {ReviewController} from "./review.controller";
import {ManufacturerSchema} from "../schemas/manufacturer.schema";
import {UserSchema} from "../schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Manufacturer', schema: ManufacturerSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService]
})
export class ReviewModule {
}
