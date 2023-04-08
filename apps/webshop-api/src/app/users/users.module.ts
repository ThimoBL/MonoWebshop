import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {UsersController} from "./users.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../schemas/user.schema";
import {OrderController} from "../order/order.controller";
import {OrderService} from "../order/order.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController, OrderController],
  providers: [UsersService, OrderService],
  exports: [UsersService, OrderService]
})
export class UsersModule {}
