import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "@mono-webshop/domain";
import {AuthService} from "@mono-webshop/products-ui";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title = 'MonoWebshop';
  loggedInUser$!: Observable<User | undefined>;

  constructor(
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
  }
}
