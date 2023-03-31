import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManufacturerController } from './manufacturer/manufacturer.controller';
import { ProductController } from './product/product.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ManufacturerService } from './manufacturer/manufacturer.service';
import { ReviewService } from './review/review.service';
import { ReviewController } from './review/review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product/product.service';
import { ManufacturerSchema } from './schemas/manufacturer.schema';
import { UserSchema } from './schemas/user.schema';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/mono-webshop'
      // `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
    ),
    MongooseModule.forFeature([
      { name: 'Manufacturer', schema: ManufacturerSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthModule,
    UsersModule,
    OrderModule,
  ],
  controllers: [
    AppController,
    ProductController,
    ManufacturerController,
    ReviewController,
    OrderController,
  ],
  providers: [
    AppService,
    ProductService,
    ManufacturerService,
    ReviewService,
    OrderService,
  ],
})
export class AppModule {}
