import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import Swal from "sweetalert2";

export class GenericService<T> {
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  });

  constructor(
    protected httpClient: HttpClient,
    public url: string,
    public endpoint: string
  ) {
  }

  public list(options?: any): Observable<T[]> {
    const endpoint = this.url + this.endpoint;
    console.log(`list ${endpoint}`);
    return this.httpClient.get<T[]>(endpoint, {headers: this.headers, ...options})
      .pipe(
        map((response: any) => response.result),
        catchError(this.handleError)
      )
  }

  public get(id: string, options?: any): Observable<T> {
    const endpoint = this.url + this.endpoint + '/' + id;
    console.log(`get ${endpoint}`);
    return this.httpClient.get<T>(endpoint,  {headers: this.headers, ...options})
      .pipe(
        map((response: any) => response.result),
        catchError(this.handleError)
      )
  }

  public create(item: T, options?: any): Observable<T> {
    const endpoint = this.url + this.endpoint;
    console.log(`create ${endpoint}`);
    return this.httpClient.post<T>(endpoint, item, {headers: this.headers, ...options})
      .pipe(
        map((response: any) => response.result),
        catchError(this.handleError)
      )
  }

  public update(id: string, item: T, options?: any): Observable<T> {
    const endpoint = this.url + this.endpoint + '/' + id;
    console.log(`update ${endpoint}`);
    return this.httpClient.put<T>(endpoint, item, {headers: this.headers, ...options})
      .pipe(
        map((response: any) => response.result),
        catchError(this.handleError)
      )
  }

  public delete(id: string, options?: any): Observable<T> {
    const endpoint = this.url + this.endpoint + '/' + id;
    console.log(`delete ${endpoint}`);
    return this.httpClient.delete<T>(endpoint, {headers: this.headers, ...options})
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      )
  }

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error)

    const errorResponse = {
      type: 'error',
      message: error.error.message || error.message
    }

    // return an error observable with a user-facing error message
    return throwError(errorResponse)
  }
}
