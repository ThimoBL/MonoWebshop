import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'mono-webshop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string | null = null;
  password: string | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
  }

  OnSubmit(): void {
    this.authService.loginUser(this.email ?? '', this.password ?? '')
      .then((user) => {
        if (user) {
          console.log('Login successful');
          this.router.navigate(['/']);
        }
      });
  }
}
