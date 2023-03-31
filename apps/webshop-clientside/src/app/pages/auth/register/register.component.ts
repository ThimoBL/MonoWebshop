import {Component, OnInit} from '@angular/core';
import {Role, User} from "@mono-webshop/domain";
import {AuthService} from "../../../services/auth/auth.service";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'mono-webshop-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  user: User = {
    _id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phone: '',
    roles: [Role.User],
    reviews: [],
    orders: []
  }

  subs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  OnSubmit(form: NgForm): void {
    if (form.valid) {
      this.subs = this.authService.registerUser(this.user)
        .subscribe({
          next: (user: User) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: `Welcome ${user.firstName} ${user.lastName} to the Mono Shop family!`,
              showConfirmButton: false,
              timer: 1500
            });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.message,
            });
          },
          complete: () => {
            console.log('complete');
            this.router.navigate(['/']);
          }
        });
    }
  }
}
