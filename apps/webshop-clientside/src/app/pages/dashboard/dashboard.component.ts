import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "@mono-webshop/domain";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'mono-webshop-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  runningMode = '';
  apiUrl = '';
  version = '';
  name = '';
  description = '';
  author = '';
  loggedInUser: User;
  constructor(
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.runningMode = environment.production ? 'Production' : 'Development';
    this.apiUrl = environment.SERVER_API_URL;
    this.name = environment.APP_NAME;
    this.version = environment.APP_VERSION;
    this.description = environment.APP_DESCRIPTION;
    this.author = environment.APP_AUTHOR;
    this.authService.currentUser$.subscribe(user => this.loggedInUser = user || {} as User);
  }
}
