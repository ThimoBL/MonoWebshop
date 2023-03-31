import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import {ManufacturerController} from "./manufacturer.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {ManufacturerSchema} from "../schemas/manufacturer.schema";

@Module({
  controllers: [],
  providers: [],
})
export class ManufacturerModule {}
