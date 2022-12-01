import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';

@Module({
  providers: [ManufacturerService],
})
export class ManufacturerModule {}
