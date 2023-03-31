import {Injectable} from "@angular/core";
import {Product} from "@mono-webshop/domain";
import {HttpClient} from "@angular/common/http";
import {GenericService} from "../generic/generic.service";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class ProductService extends GenericService<Product> {
  constructor(http: HttpClient) {
    super(http, environment.SERVER_API_URL, 'products');
  }
}

