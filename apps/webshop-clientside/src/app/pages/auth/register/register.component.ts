import {Component, OnInit} from '@angular/core';
import {Role, User} from "@mono-webshop/domain";

@Component({
  selector: 'mono-webshop-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  user: User = {
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phone: '',
    role: Role.User
  }

  constructor() {}

  ngOnInit(): void {}

  OnSubmit(): void {}
}
