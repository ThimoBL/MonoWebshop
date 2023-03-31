import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../../../../../../libs/domain/src/lib/Review.interface";
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {User} from "@mono-webshop/domain";
import {ReviewService} from "../../../services/review/review.service";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'review-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css', '../review.component.css'],
  providers: [NgbRatingModule]
})
export class CreateComponent implements OnInit {
  public isCollapsed = true;
  public currentRate = 1;
  public review: Review = {
    title: '',
    description: '',
    rating: 1,
    product: '',
    createdBy: {} as User
  }

  @Input() productId: string;
  @Input() callbackFunction: () => void;


  constructor(
    private readonly router: Router,
    public authService: AuthService,
    private readonly reviewService: ReviewService
  ) {}

  ngOnInit(): void {
  }

  OnSubmit(form: NgForm): void {

    this.review.rating = this.currentRate;
    this.review.product = this.productId;
    this.review.createdBy = this.authService.currentUser$.getValue()!;

    console.log(this.review)

    this.reviewService.create(this.review).subscribe({
      next: () => {
        Swal.fire({
          title: 'Review created!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'The review could not be created! <br /> Reason: ' + error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      },
      complete: () => {
        this.isCollapsed = true;
        this.callbackFunction();
        this.router.navigate(['/products']);
      }
    });

    Swal.fire({
      title: 'Success!',
      text: 'Your review has been created!',
      icon: 'success',
    })

    this.isCollapsed = true;

    this.callbackFunction();
    // this.router.navigate(['/products']);
  }
}
