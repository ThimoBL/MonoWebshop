import {Review} from "../../../../../../libs/domain/src/lib/Review.interface";
import {Injectable} from "@angular/core";
import {UserService} from "../user/user.service";
import {GenericService} from "../generic/generic.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, map, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ReviewService extends GenericService<Review>{
  private readonly customHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  });

  constructor(http: HttpClient) {
    super(http, environment.SERVER_API_URL, 'reviews');
  }

  public listByUser(userId: string): Observable<Review[]> {
    const endpoint = this.url + this.endpoint + 'user/' + userId;
    console.log(`list ${endpoint}`);
    return this.httpClient.get<Review[]>(endpoint, {headers: this.customHeader})
      .pipe(
        map((response: any) => response.result),
        catchError(this.handleError)
      )
  }

  public listByProduct(productId: string): Observable<Review[]> {
    const endpoint = this.url + this.endpoint + '/product/' + productId;
    console.log(`list ${endpoint}`);
    return this.httpClient.get<Review[]>(endpoint, {headers: this.customHeader})
      .pipe(
        map((response: any) => response.result),
        catchError(this.handleError)
      )
  }

  // public listByProduct(productId: number): Review[] {
  //   return this.reviews.filter((review => review.product === productId)).reverse();
  // }

  // public averageRatingByUser(userId: number): number {
  //   const reviews = this.listByUser(userId).reverse();
  //   return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  // }

  // public averageRatingByProduct(productId: number): number {
  //   const reviews = this.listByProduct(productId).reverse();
  //   return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  // }
}
