import {Injectable, Logger} from '@nestjs/common';
import {Manufacturer, Product} from "@mono-webshop/domain";
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";
import {Neo4jService} from "nest-neo4j/dist";
import {error} from "neo4j-driver";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Manufacturer') private manufacturerModel: Model<Manufacturer>,
    private readonly neo4jService: Neo4jService,
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

  async recommended(): Promise<Product> {
    const recommendedProd = await this.neo4jService.read(`
      MATCH (u1:User)<-[:ORDERED_BY]-(p1:Product)-[:ORDERED_BY]->(u2:User)<-[:ORDERED_BY]-(p2:Product)
      WHERE u1 <> u2 AND NOT (u2)-[:ORDERED_BY]->(p1)
      RETURN p2
    `);

    if (!recommendedProd) {
      Logger.log('No recommended product found');
      return await this.manufacturerModel.findOne<Product>({}, {_id: 0, 'products.$': 1}).then(products => {
        return products['products'][0];
      });
    }

    Logger.log(JSON.stringify(recommendedProd));

    const productId = recommendedProd.records.map(record => record.get('p2'))[0];

    Logger.log(productId['properties']['id']);
    const result = await this.manufacturerModel.findOne<Product>({'products._id': productId['properties']['id']}, {
      _id: 0,
      'products.$': 1
    }).exec();

    if (!result) throw Error('No product found with id: ' + productId);

    return result['products'][0];
  }

  async create(product: Product): Promise<any> {
    const objectId = mongoose.Types.ObjectId;

    let id = new objectId().toString();

    const neoProduct = await this.neo4jService.write(`
      MATCH (m:Manufacturer {id: $manufacturer})
      WHERE NOT EXISTS((m)-[:MANUFACTURES]->(:Product {id: $id, name: $name}))
      CREATE (m)-[:MANUFACTURES]->(p:Product {id: $id, name: $name})
      RETURN p
    `, {
      id: id,
      name: product.name,
      manufacturer: product.manufacturer
    })

    return this.manufacturerModel.findOneAndUpdate(
      {_id: product.manufacturer},
      {
        $addToSet: {
          products: {
            _id: id,
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
