import {Injectable} from "@angular/core";
import {Product} from "@mono-webshop/domain";
import { ManufacturerService } from "./manufacturer.service";

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private readonly products: Product[];

  constructor(
    private readonly manufacturerService: ManufacturerService
    // protected readonly http: HttpClient,
    // public readonly url: string,
    // public readonly endpoint: string
  ) {
    this.products = [{
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description',
      price: 1,
      image: 'https://picsum.photos/200/300',
      size: 'S',
      manufacturer: this.manufacturerService.get(1)
    } , {
      id: 2,
      name: 'Product 2',
      description: 'Product 2 description',
      price: 2,
      image: 'https://picsum.photos/200/300',
      size: 'M',
      manufacturer: this.manufacturerService.get(2)
    }, {
      id: 3,
      name: 'Product 3',
      description: 'Product 3 description',
      price: 3,
      image: 'https://picsum.photos/200/300',
      size: 'L',
      manufacturer: this.manufacturerService.get(3)
    }, {
      id: 4,
      name: 'Product 4',
      description: 'Product 4 description',
      price: 4,
      image: 'https://picsum.photos/200/300',
      size: 'XL',
      manufacturer: this.manufacturerService.get(4)
    }, {
      id: 5,
      name: 'Product 5',
      description: 'Product 5 description',
      price: 5,
      image: 'https://picsum.photos/200/300',
      size: 'XXL',
      manufacturer: this.manufacturerService.get(5)
    }]
  }

  public list(): Product[] {
    return this.products;
  }

  public get(id: number): Product {
    return this.products.filter((product => product.id === id))[0];
  }

  public create(product: Product): Product {
    product.id = this.products.length + 1;
    this.products.push(product);
    return product;
  }

  public update(id: number, product: Product): Product {
    const index = this.products.findIndex((p => p.id === id));
    this.products[index] = product;
    return product;
  }

  public delete(id: number): void {
    const index = this.products.findIndex((p => p.id === id));
    this.products.splice(index, 1);
  }

  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>('http://localhost:3000/products');
  // }
}
