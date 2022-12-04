import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../../../../../../libs/domain/src/lib/Review.interface";
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {User} from "@mono-webshop/domain";
import {ReviewService} from "../../../services/review/review.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'review-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [NgbRatingModule]
})
export class CreateComponent implements OnInit {
  public isCollapsed = true;
  public currentRate = 1;
  public review: Review = {
    id: 0,
    title: '',
    description: '',
    rating: 1,
    product: 0,
    user: {} as User
  }

  @Input() productId: string | null = null;

  constructor(
    private readonly reviewService: ReviewService
  ) {}

  ngOnInit(): void {
  }

  OnSubmit(form: NgForm): void {

    this.review.rating = this.currentRate;
    this.review.product = parseInt(this.productId || '0');

    this.reviewService.create(this.review);

    this.isCollapsed = true;
  }
}
