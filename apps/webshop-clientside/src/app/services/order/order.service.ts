import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {GenericService} from "../generic/generic.service";
import {Order} from "@mono-webshop/domain";

@Injectable({ providedIn: 'root' })
export class OrderService extends GenericService<Order> {
  constructor(http: HttpClient) {
    super(http, environment.SERVER_API_URL, 'orders');
  }
}
