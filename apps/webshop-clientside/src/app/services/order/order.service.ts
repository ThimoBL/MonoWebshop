import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {GenericService} from "../generic/generic.service";
import {Order} from "@mono-webshop/domain";
import {catchError, map} from "rxjs";

@Injectable({ providedIn: 'root' })
export class OrderService extends GenericService<Order> {
  private readonly customHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  });

  constructor(http: HttpClient) {
    super(http, environment.SERVER_API_URL, 'orders');
  }

  listByUser(userId: string) {
    let url = this.url + this.endpoint + '/user/' + userId;
    return this.httpClient.get<Order[]>(url, {headers: this.customHeader})
      .pipe(
        map((response: any) => response.result.orders),
        catchError(this.handleError)
      );
  }
}
