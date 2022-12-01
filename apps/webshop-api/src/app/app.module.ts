import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManufacturerController } from './manufacturer/manufacturer.controller';
import { ProductController } from './product/product.controller';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { AuthModule } from './auth/auth.module';
import {UsersService} from "./users/users.service";
import {ManufacturerService} from "./manufacturer/manufacturer.service";
import {ProductService} from "./product/product.service";

@Module({
  imports: [
    // MongooseModule.forRoot(
    //   `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
    // ),
    AuthModule,
    UsersModule,
    ProductModule,
    ManufacturerModule,
  ],
  controllers: [
    AppController,
    ManufacturerController,
    ProductController,
    UsersController,
  ],
  providers: [
    AppService,
    UsersService,
    ManufacturerService,
    ProductService,
  ],
})
export class AppModule {}
