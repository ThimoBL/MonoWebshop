import {Injectable} from "@angular/core";
import {Manufacturer} from "@mono-webshop/domain";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {GenericService} from "../generic/generic.service";

@Injectable({ providedIn: 'root' })
export class ManufacturerService extends GenericService<Manufacturer> {
  constructor(http: HttpClient) {
    super(http, environment.SERVER_API_URL, 'manufacturers');
  }
}

