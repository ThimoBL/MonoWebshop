import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {OrderSchema} from "../schemas/order.schema";
import {OrderService} from "./order.service";
import {OrderController} from "./order.controller";
import {UserSchema} from "../schemas/user.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {
}
