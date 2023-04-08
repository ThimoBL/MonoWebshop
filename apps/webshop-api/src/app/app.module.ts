import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ManufacturerController} from './manufacturer/manufacturer.controller';
import {ProductController} from './product/product.controller';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {ManufacturerService} from './manufacturer/manufacturer.service';
import {ReviewService} from './review/review.service';
import {ReviewController} from './review/review.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductService} from './product/product.service';
import {ManufacturerSchema} from './schemas/manufacturer.schema';
import {UserSchema} from './schemas/user.schema';
import {OrderService} from './order/order.service';
import {OrderController} from './order/order.controller';
import {OrderModule} from './order/order.module';
import {Neo4jScheme} from "nest-neo4j/dist";
import {Neo4jModule} from "nest-neo4j";
import {environment} from "../environments/environment";
import {ProductModule} from "./product/product.module";
import {ManufacturerModule} from "./manufacturer/manufacturer.module";
import {ReviewModule} from "./review/review.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      environment.DB_CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    ),
    Neo4jModule.forRoot({
      scheme: environment.NEO4J_URI as Neo4jScheme,
      host: environment.NEO4J_HOST,
      port: environment.NEO4J_PORT,
      username: environment.NEO4J_USERNAME,
      password: environment.NEO4J_PASSWORD,
    }),
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema},
      {name: 'Manufacturer', schema: ManufacturerSchema},
    ]),
    AuthModule,
    UsersModule,
    ManufacturerModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {
}
