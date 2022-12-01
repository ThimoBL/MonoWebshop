import {Injectable} from "@angular/core";
import {Manufacturer} from "@mono-webshop/domain";


@Injectable({ providedIn: 'root' })
export class ManufacturerService {

  private readonly manufacturers: Manufacturer[];

  constructor(
    // protected readonly http: HttpClient,
    // public readonly url: string,
    // public readonly endpoint: string
  ) {
    this.manufacturers = [{
      id: 1,
      name: 'Manufacturer 1',
      city: 'City 1',
      country: 'Nederland',
      email: 'Example@gmail.com',
      phone: '0612345678'
    }, {
      id: 2,
      name: 'Manufacturer 2',
      city: 'City 2',
      country: 'Nederland',
      email: 'Exammple@gmail.com',
      phone: '0612345678'
    }, {
      id: 3,
      name: 'Manufacturer 3',
      city: 'City 3',
      country: 'Nederland',
      email: 'Example@gmail.com',
      phone: '0612345678'
    }, {
      id: 4,
      name: 'Manufacturer 4',
      city: 'City 4',
      country: 'Nederland',
      email: 'Example@gmail.com',
      phone: '0612345678'
    }, {
      id: 5,
      name: 'Manufacturer 5',
      city: 'City 5',
      country: 'Nederland',
      email: 'Example@gmail.com',
      phone: '0612345678'
    }]
  }

  public list(): Manufacturer[] {
    return this.manufacturers;
  }

  public get(id: number): Manufacturer {
    return this.manufacturers.filter((manufacturer => manufacturer.id === id))[0];
  }

  public create(manufacturer: Manufacturer): Manufacturer {
    manufacturer.id = this.manufacturers.length + 1;
    this.manufacturers.push(manufacturer);
    return manufacturer;
  }

  public update(id: number, manufacturer: Manufacturer): Manufacturer {
    const index = this.manufacturers.findIndex((p => p.id === id));
    this.manufacturers[index] = manufacturer;
    return manufacturer;
  }

  public delete(id: number): void {
    const index = this.manufacturers.findIndex((p => p.id === id));
    this.manufacturers.splice(index, 1);
  }

}
