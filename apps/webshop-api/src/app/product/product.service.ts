import {Injectable, Logger} from '@nestjs/common';
import {Manufacturer, Product} from "@mono-webshop/domain";
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Manufacturer') private manufacturerModel: Model<Manufacturer>,
  ) {
  }

  async list(): Promise<Product[]> {
    return this.manufacturerModel.find<Product>({}, {_id: 0, products: 1}).then(products => {
      return products.map(product => product['products']).reduce((a, b) => a.concat(b), []);
    });
  }

  async get(id: string): Promise<Product> {
    const objectId = mongoose.Types.ObjectId;

    const test = await this.manufacturerModel.findOne<Product>({'products._id': id}, {_id: 0, 'products.$': 1});
    return test['products'][0];
  }

  async create(product: Product): Promise<any> {
    const objectId = mongoose.Types.ObjectId;

    return this.manufacturerModel.findOneAndUpdate(
      {_id: product.manufacturer},
      {
        $addToSet: {
          products: {
            _id: new objectId().toString(),
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            size: product.size,
            reviews: product.reviews,
            manufacturer: product.manufacturer,
            createdBy: product.createdBy,
          }
        }
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      });
  }

  async update(id: string, product: Product): Promise<Product> {
    return this.manufacturerModel.findOneAndUpdate<Product>(
      {_id: product.manufacturer, "products._id": id},
      {
        $set:
          {"products.$[elem]": product}
      },
      {
        arrayFilters: [{"elem._id": id}],
        new: true
      }
    );
  }

  async delete(id: string): Promise<boolean> {
    return this.manufacturerModel.findOneAndUpdate(
      {"products._id": id},
      {
        $pull: {
          products: {_id: id}
        }
      },
      {
        new: true
      }
    )
      .then(
        () =>
          Promise
            .resolve(
              true
            ));
  }
}
