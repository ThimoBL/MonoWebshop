import {Injectable} from "@angular/core";
import {Role, User} from "@mono-webshop/domain";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {GenericService} from "../generic/generic.service";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService extends GenericService<User> {
  constructor(http: HttpClient) {
    super(http, environment.SERVER_API_URL, 'users');
  }
}
