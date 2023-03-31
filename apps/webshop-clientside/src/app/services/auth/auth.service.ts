import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, switchMap} from "rxjs";
import {LoginForm, Role, User} from "@mono-webshop/domain";
import {UserService} from "../user/user.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "../generic/jwtHelper.service";

@Injectable({providedIn: 'root'})
export class AuthService {
  public currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  public accessToken$ = new BehaviorSubject<string | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly ACCESS_TOKEN = 'access_token';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });


  constructor(
    private jwtHelperService: JwtHelperService,
    private usersService: UserService,
    private http: HttpClient,
    private router: Router
  ) {
    this.getUserFromLocalStorage()
      .pipe(
        // switchMap is overbodig als we validateToken() niet gebruiken...
        switchMap((user: User | undefined) => {
          if (user) {
            console.log('User found in local storage');
            this.currentUser$.next(user);
            // return this.validateToken(user);
            return of(user);
          } else {
            console.log(`No current user found`);
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));

    this.getAccessTokenFromLocalStorage()
      .pipe(
        switchMap((token: string | undefined) => {
          if (token) {
            console.log('Token found in local storage');
            this.accessToken$.next(token);
            return of(token);
          } else {
            console.log(`No current token found`);
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));
  }

  loginUser(loginForm: LoginForm): Observable<any> {
    const body = JSON.stringify(loginForm);
    const url = `${environment.SERVER_API_URL}auth/login`;
    console.log(`Login user ${JSON.stringify(loginForm)} at ${url}`);
    return this.http.post<any>(url, body, {headers: this.headers})
      .pipe(
        map((response: any) => {
          const tokenToUserObj = this.jwtHelperService.decodeToken(
            response.result.access_token
          );
          this.saveUserToLocalStorage(tokenToUserObj);
          this.saveAccessTokenToLocalStorage(response.result.access_token);
          this.currentUser$.next(tokenToUserObj);

          Swal.fire({
            icon: 'success',
            title: 'Login successful',
            text: `Welcome ${tokenToUserObj.firstName} ${tokenToUserObj.lastName}`,
          });

          return this.currentUser$.getValue();
        }),
        catchError((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: `Login failed: ${error.error.message}`,
          });
          return of(undefined);
        }),
      );
  }

  registerUser(user: User): Observable<any> {
    const body = JSON.stringify(user);
    const url = `${environment.SERVER_API_URL}auth/register`;
    console.log(`Register user ${JSON.stringify(user)} at ${url}`);
    return this.http.post<any>(url, body, {headers: this.headers})
      .pipe(
        map((response: any) => {
          const tokenToUserObj = this.jwtHelperService.decodeToken(
            response.result.access_token
          );
          this.saveUserToLocalStorage(tokenToUserObj);
          this.saveAccessTokenToLocalStorage(response.result.access_token);
          this.currentUser$.next(tokenToUserObj);

          return this.currentUser$.getValue();
        }),
        catchError((error) => {
          console.log(error);
          return of(undefined);
        }),
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: User | undefined) => user !== undefined)
    );
  }

  logout(): void {
    this.router
      .navigate(['/'])
      .then(() => {
        this.currentUser$.next(undefined);
        localStorage.removeItem(this.CURRENT_USER);
        localStorage.removeItem(this.ACCESS_TOKEN);
        Swal.fire({
          icon: 'success',
          title: 'Logout successful',
          text: `You are logged out`,
        })
      }).catch((error) => {
      console.log(error);
    });
  }

  getUserFromLocalStorage(): Observable<User | undefined> {
    const userData = localStorage.getItem(this.CURRENT_USER);
    if (userData) {
      const localUser = JSON.parse(userData);
      return of(localUser);
    } else {
      return of(undefined);
    }
  }

  getAccessTokenFromLocalStorage(): Observable<string | undefined> {
    const token = localStorage.getItem(this.ACCESS_TOKEN);
    if (token) {
      // const localToken = JSON.parse(token);
      return of(token);
    } else {
      return of(undefined);
    }
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  private saveAccessTokenToLocalStorage(accessToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  userMayEdit(itemUserId: string): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: User | undefined) =>
        user ? (user._id === itemUserId || user.roles.includes(Role.Admin)) : false
      )
    );
  }

  userInRole(role: string): Observable<boolean> {
    let roleEnum = role === 'admin' ? Role.Admin : Role.User;
    return this.currentUser$.pipe(
      map((user: User | undefined) =>
        user ? user?.roles?.includes(roleEnum) : false
      )
    );
  }

  getUserId(): Observable<string> {
    return this.currentUser$.pipe(
      map((user: User | undefined) =>
        user ? user._id : ''
      )
    );
  }

  getAuthorizationToken(): string | undefined {
    const userData = localStorage.getItem(this.CURRENT_USER);
    if (userData) {
      const user: User = JSON.parse(userData);

      console.log('LET OP, TO DO!');
      // return user.accessToken; // user.token;
    }
    return undefined;
  }
}
