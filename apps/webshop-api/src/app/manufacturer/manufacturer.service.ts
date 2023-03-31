import {Injectable, Logger} from '@nestjs/common';
import {Manufacturer, Product} from "@mono-webshop/domain";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import * as Mongoose from "mongoose";

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectModel('Manufacturer') private manufacturerModel: Model<Manufacturer>
  ) {
  }

  async list(): Promise<Manufacturer[]> {
    return this.manufacturerModel.find().exec();
  }

  async get(id: string): Promise<Manufacturer> {
    return this.manufacturerModel.findById(id).exec();
  }

  async create(manufacturer: Manufacturer): Promise<Manufacturer> {
    const createdManufacturer = new this.manufacturerModel(manufacturer);
    return createdManufacturer.save();
  }

  async update(id: number, manufacturer: Manufacturer): Promise<Manufacturer> {
    return this.manufacturerModel.findOneAndUpdate<Manufacturer>(
      {_id: id},
      {
        $set: manufacturer
      },
      {
        new: true,
        upsert: true,
        useFindAndModify: false,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    )
  }

  async delete(id: number): Promise<boolean> {
    return this.manufacturerModel.deleteOne({_id: id})
      .then(() => Promise.resolve(true));
  }
}
