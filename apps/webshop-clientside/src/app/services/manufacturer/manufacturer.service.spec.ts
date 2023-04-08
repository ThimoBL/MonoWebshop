import {Test, TestingModule} from '@nestjs/testing';
import {ManufacturerService} from './manufacturer.service';
import {Manufacturer} from "@mono-webshop/domain";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

describe('ManufacturerService', () => {
  let service: ManufacturerService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ManufacturerService,
      ]
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', async () => {
    service = await TestBed.inject(ManufacturerService);
    httpMock = await TestBed.inject(HttpTestingController);

    expect(service).toBeTruthy();
  });

  it('should return a list of manufacturers', async () => {
    service = await TestBed.inject(ManufacturerService);
    httpMock = await TestBed.inject(HttpTestingController);

      const dummyManufacturers: Manufacturer[] = [
        {
          "name": "Manufacturer 1",
          "city": "City 1",
          "country": "Nederland",
          "email": "Example@gmail.com",
          "phone": "0612345678",
          "createdBy": "64314f172369acd85d68871e",
          "products": []
        },
        {
          "name": "Manufacturer 2",
          "city": "City 2",
          "country": "Nederland",
          "email": "Example@gmail.com",
          "phone": "0612345678",
          "createdBy": "64314f172369acd85d68871e",
          "products": []
        }
      ];

      service.list().subscribe((manufacturers: Manufacturer[]) => {
        expect(manufacturers.length).toBe(2);
        expect(manufacturers).toEqual(dummyManufacturers);
      });

      const req = httpMock.expectOne(`${service.url}manufacturers`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyManufacturers);
  });

  it('create a manufacturer', async () => {
    service = await TestBed.inject(ManufacturerService);
    httpMock = await TestBed.inject(HttpTestingController);

    const dummyManufacturer: Manufacturer = {
      "name": "Manufacturer 1",
      "city": "City 1",
      "country": "Nederland",
      "email": "Example@gmail.com",
      "phone": "0612345678",
      "createdBy": "64314f172369acd85d68871e",
      "products": []
    };

    service.create(dummyManufacturer).subscribe((manufacturer: Manufacturer) => {
      expect(manufacturer).toEqual(dummyManufacturer);
    });

    const req = httpMock.expectOne(`${service.url}manufacturers`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyManufacturer);
  });

  it('update a manufacturer', async () => {
    service = await TestBed.inject(ManufacturerService);
    httpMock = await TestBed.inject(HttpTestingController);

    const dummyManufacturer: Manufacturer = {
      "_id": "64314f172369acd85d68871e",
      "name": "Manufacturer 1",
      "city": "City 1",
      "country": "Nederland",
      "email": "Example@gmail.com",
      "phone": "0612345678",
      "createdBy": "64314f172369acd85d68871e",
      "products": []
    };

    service.update(dummyManufacturer._id!, dummyManufacturer).subscribe((manufacturer: Manufacturer) => {
      expect(manufacturer).toEqual(dummyManufacturer);
    });

    const req = httpMock.expectOne(`${service.url}manufacturers/${dummyManufacturer._id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyManufacturer);
  });

  it('delete a manufacturer', async () => {
    service = await TestBed.inject(ManufacturerService);
    httpMock = await TestBed.inject(HttpTestingController);

    const dummyManufacturer: Manufacturer = {
      "_id": "64314f172369acd85d68871e",
      "name": "Manufacturer 1",
      "city": "City 1",
      "country": "Nederland",
      "email": "Example@gmail.com",
      "phone": "0612345678",
      "createdBy": "64314f172369acd85d68871e",
      "products": []
    };

    service.delete(dummyManufacturer._id!).subscribe((manufacturer: Manufacturer) => {
      expect(manufacturer).toEqual(dummyManufacturer);
    });

    const req = httpMock.expectOne(`${service.url}manufacturers/${dummyManufacturer._id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyManufacturer);
  });
});
