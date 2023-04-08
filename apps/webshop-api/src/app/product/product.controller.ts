import {Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ProductService} from "./product.service";
import {Product, Role} from "@mono-webshop/domain";
import {HasRoles} from "../auth/has-roles.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService
  ) {
  }

  @Get()
  getProducts() {
    Logger.log(`get products`);
    return this.productService.list();
  }

  @Get('recommended')
  @UseGuards(JwtAuthGuard)
  getRecommendedProduct() {
    Logger.log(`get recommended product`);
    return this.productService.recommended();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    Logger.log(`get product ${id}`);
    return this.productService.get(id);
  }

  @Post()
  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createProduct(@Body() product: Product) {
    Logger.log(`create product ${JSON.stringify(product)}`);
    return this.productService.create(product);
  }

  @Put(':id')
  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateProduct(@Param('id') id: string, @Body() product: Product) {
    Logger.log(`update product ${id}`);
    return this.productService.update(id, product);
  }

  @Delete(':id')
  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteProduct(@Param('id') id: string) {
    Logger.log(`delete product ${id}`);
    return this.productService.delete(id);
  }
}
