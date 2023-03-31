import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {LoginForm, User} from "@mono-webshop/domain";
import {Subscription} from "rxjs";

@Component({
  selector: 'mono-webshop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: LoginForm = {
    username: '',
    password: ''
  };

  subs: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
  }

  OnSubmit(): void {
    this.subs = this.authService.loginUser(this.login)
      .subscribe({
        next: (user: User) => {
          console.log(user);
        },
        error: (error) => {
          console.log('error:', error);
        },
        complete: () => {
          console.log('complete');
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
