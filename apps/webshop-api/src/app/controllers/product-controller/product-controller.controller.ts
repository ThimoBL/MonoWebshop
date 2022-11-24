import {Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {ProductsService} from "@mono-webshop/products-ui";
import {Product} from "@mono-webshop/data";

@Controller('products')
export class ProductControllerController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productService.list();
  }

  @Get(':id')
  getProduct(id: number) {
    return this.productService.get(id);
  }

  @Post()
  createProduct(product: Product) {
    return this.productService.create(product);
  }

  @Put(':id')
  updateProduct(id: number, product: Product) {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  deleteProduct(id: number) {
    return this.productService.delete(id);
  }
}
