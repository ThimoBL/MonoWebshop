import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductControllerController } from './controllers/product-controller/product-controller.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://localhost/nest`
    ),
  ],
  controllers: [AppController, ProductControllerController],
  providers: [AppService],
})
export class AppModule {}
