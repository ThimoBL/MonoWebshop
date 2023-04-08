import {Injectable} from "@angular/core";
import {Product} from "@mono-webshop/domain";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GenericService} from "../generic/generic.service";
import {environment} from "../../../environments/environment";
import {catchError, map, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ProductService extends GenericService<Product> {

  private readonly customHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  });
  constructor(http: HttpClient) {
    super(http, environment.SERVER_API_URL, 'products');
  }

  getRecommendedProduct(): Observable<Product> {
    const endpoint = this.url + this.endpoint + '/' + 'recommended';
    return this.httpClient.get<any>(endpoint, {headers: this.customHeaders})
      .pipe(
        map((response: any) => response.result),
        catchError(this.handleError)
      );
  }
}

