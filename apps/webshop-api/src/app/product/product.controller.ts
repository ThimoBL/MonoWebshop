import {Controller} from '@nestjs/common';
import {ProductService} from "./product.service";

@Controller('products')
export class ProductController {
  constructor() {}

  // @Get()
  // getProducts() {
  //   return this.productService.list();
  // }
  //
  // @Get(':id')
  // getProduct(id: number) {
  //   return this.productService.get(id);
  // }
  //
  // @Post()
  // createProduct(product: Product) {
  //   return this.productService.create(product);
  // }
  //
  // @Put(':id')
  // updateProduct(id: number, product: Product) {
  //   return this.productService.update(id, product);
  // }
  //
  // @Delete(':id')
  // deleteProduct(id: number) {
  //   return this.productService.delete(id);
  // }
}
