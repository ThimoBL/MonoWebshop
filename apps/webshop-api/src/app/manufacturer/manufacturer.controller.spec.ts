import { Test, TestingModule } from '@nestjs/testing';
import {ManufacturerController} from "./manufacturer.controller";
import {ManufacturerService} from "./manufacturer.service";

describe('ManufacturerController', () => {
  let app: TestingModule;
  let manufacturerController: ManufacturerController;
  let manufacturerService: ManufacturerService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ManufacturerController],
      providers: [{
        provide: ManufacturerService,
        useValue: {
          list: jest.fn(),
          get: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        }
      }],
    }).compile();

    manufacturerController = app.get<ManufacturerController>(ManufacturerController);
    manufacturerService = app.get<ManufacturerService>(ManufacturerService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(manufacturerController).toBeDefined();
  });

  describe('getManufacturers', () => {
    it('should return an array of manufacturers', async () => {
      const getManufacturers = jest.spyOn(manufacturerService, 'list')
        .mockImplementation(async () => []);

      const result = await manufacturerController.getManufacturers();

      expect(getManufacturers).toBeCalledTimes(1);
      expect(result).toStrictEqual([]);
    });
  });

  describe('createManufacturer', () => {
    it('should return a manufacturer', async () => {
      const manufacturer = {
        "name": "Manufacturer 1",
        "city": "City 1",
        "country": "Nederland",
        "email": "Example@gmail.com",
        "phone": "0612345678",
        "createdBy": "5f9f1b9b9c9d1c0e8c8b9b9c",
        "products": []
      };

      const createManufacturer = jest.spyOn(manufacturerService, 'create')
        .mockImplementation(async () => (manufacturer));

      const result = await manufacturerController.createManufacturer(manufacturer);

      expect(createManufacturer).toBeCalledTimes(1);
      expect(result).toStrictEqual(manufacturer);
    });

    it('should throw an error if manufacturer is invalid', async () => {
      const manufacturer = {
        "name": "Manufacturer 1",
        "city": "City 1",
        "country": "Nederland",
        "email": "Example@gmail.com",
        "phone": "0612345678",
        "createdBy": "5f9f1b9b9c9d1c0e8c8b9b9c",
        "products": []
      };

      const createManufacturer = jest.spyOn(manufacturerService, 'create')
        .mockImplementation(async () => {throw new Error('Invalid manufacturer')});

      await expect (manufacturerController.createManufacturer(manufacturer)).rejects.toThrowError('Invalid manufacturer');

      expect(createManufacturer).toBeCalledTimes(1);
      expect(createManufacturer).toBeCalledWith(manufacturer);
    });
  });
});
