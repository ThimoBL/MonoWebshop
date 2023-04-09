import {Injectable, Logger} from '@nestjs/common';
import {Manufacturer, Product} from "@mono-webshop/domain";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import * as Mongoose from "mongoose";
import {Neo4jService} from "nest-neo4j/dist";

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectModel('Manufacturer') private manufacturerModel: Model<Manufacturer>,
    private readonly neo4jService: Neo4jService
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

    const neoManufacturer = await this.neo4jService.write(`
      CREATE (m:Manufacturer {id: $id, name: $name})
      RETURN m
    `, {
      id: createdManufacturer._id.toString(),
      name: createdManufacturer.name
    });

    return createdManufacturer.save();
  }

  async update(id: string, manufacturer: Manufacturer): Promise<Manufacturer> {
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

  async delete(id: string): Promise<boolean> {
    return this.manufacturerModel.deleteOne({_id: id})
      .then(() => Promise.resolve(true));
  }
}
