import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {User} from "@mono-webshop/domain";
import {BehaviorSubject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUser$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private usersService: UserService) {}

  async loginUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      this.currentUser$.next(user);
      return result;
    }
    return null;
  }

  async registerUser(user: User): Promise<any> {
    return this.usersService.create(user);
  }

  logout(): void {
    this.currentUser$.next(undefined);
  }
}
