import {Test, TestingModule} from '@nestjs/testing';
import {ProductControllerController} from './product-controller.controller';
import {ProductsService} from "@mono-webshop/products-ui";

describe('ProductControllerController', () => {
  let controller: ProductControllerController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductControllerController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductControllerController>(
      ProductControllerController
    );
    service = module.get<ProductsService>(ProductsService);
  });

  describe('controller should be defined', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('ProductService should exist', () => {
      expect(service.get(1)).toEqual({
        id: 1,
        name: 'Product 1',
        description: 'Product 1 description',
        price: 1,
        image: 'https://picsum.photos/200/300',
        size: 'S'
      });
    });
  });
});
