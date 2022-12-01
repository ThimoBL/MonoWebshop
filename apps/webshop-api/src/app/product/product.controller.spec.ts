import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('ProductService should exist', () => {
  //   expect(service.get(1)).toEqual({
  //     id: 1,
  //     name: 'Product 1',
  //     description: 'Product 1 description',
  //     price: 1,
  //     image: 'https://picsum.photos/200/300',
  //     size: 'S'
  //   });
  // });
});
