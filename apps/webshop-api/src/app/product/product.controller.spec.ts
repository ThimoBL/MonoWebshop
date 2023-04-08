import { Test, TestingModule } from '@nestjs/testing';
import {ProductController} from "./product.controller";
import {ProductService} from "./product.service";

describe('ProductController', () => {
  let app: TestingModule;
  let productController: ProductController;
  let productService: ProductService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{
        provide: ProductService,
        useValue: {
          list: jest.fn(),
          get: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        }
      }],
    }).compile();

    productController = app.get<ProductController>(ProductController);
    productService = app.get<ProductService>(ProductService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const getProducts = jest.spyOn(productService, 'list')
        .mockImplementation(async () => []);

      const result = await productController.getProducts();

      expect(getProducts).toBeCalledTimes(1);
      expect(result).toStrictEqual([]);
    });
  });

  describe('createProduct', () => {
    it('should return a product', async () => {
      const product = {
        "name": "Eerste product",
        "description": "728",
        "price": 1,
        "image": "",
        "size": "Fugit consectetur",
        "manufacturer": "6394ac629f5ca5ae8f64f5f4",
        "reviews": [],
        "createdBy": "6393290d4a1b8e9d567d62da"
      };

      const createManufacturer = jest.spyOn(productService, 'create')
        .mockImplementation(async () => (product));

      const result = await productController.createProduct(product);

      expect(createManufacturer).toBeCalledTimes(1);
      expect(result).toStrictEqual(product);
    });

    it('should throw an error if product is invalid', async () => {
      const product = {
        "name": "Eerste product",
        "description": "728",
        "price": 1,
        "image": "",
        "size": "Fugit consectetur",
        "manufacturer": "6394ac629f5ca5ae8f64f5f4",
        "reviews": [],
        "createdBy": "6393290d4a1b8e9d567d62da"
      };

      const createManufacturer = jest.spyOn(productService, 'create')
        .mockImplementation(async () => {throw new Error('Invalid product')});

      await expect (productController.createProduct(product)).rejects.toThrowError('Invalid product');

      expect(createManufacturer).toBeCalledTimes(1);
      expect(createManufacturer).toBeCalledWith(product);
    });
  });
});
