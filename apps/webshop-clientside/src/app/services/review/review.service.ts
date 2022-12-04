import {Review} from "../../../../../../libs/domain/src/lib/Review.interface";
import {Injectable} from "@angular/core";
import {UserService} from "../user/user.service";

@Injectable({providedIn: 'root'})
export class ReviewService {
  private readonly reviews: Review[];

  constructor(
    private readonly UserService: UserService,
  ) {
    this.reviews = [{
      id: 1,
      title: 'Review 1',
      description: 'Review 1 description',
      rating: 1,
      product: 1,
      user: this.UserService.get(1)
    }, {
      id: 2,
      title: 'Review 2',
      description: 'Review 2 description',
      rating: 2,
      product: 2,
      user: this.UserService.get(2)
    }, {
      id: 3,
      title: 'Review 3',
      description: 'Review 3 description',
      rating: 3,
      product: 3,
      user: this.UserService.get(1)
    }, {
      id: 4,
      title: 'Review 4',
      description: 'Review 4 description',
      rating: 4,
      product: 4,
      user: this.UserService.get(2)
    }, {
      id: 5,
      title: 'Review 5',
      description: 'Review 5 description',
      rating: 5,
      product: 5,
      user: this.UserService.get(1)
    }].reverse()
  }

  public list(): Review[] {
    return this.reviews;
  }

  public get(id: number): Review {
    return this.reviews.filter((review => review.id === id))[0];
  }

  public create(review: Review): Review {
    review.id = this.reviews.length + 1;
    this.reviews.push(review);
    this.reviews.reverse()
    return review;
  }

  public update(id: number, review: Review): Review {
    const index = this.reviews.findIndex((review => review.id === id));
    this.reviews[index] = review;
    return review;
  }

  public delete(id: number): void {
    const index = this.reviews.findIndex((review => review.id === id));
    this.reviews.splice(index, 1);
  }

  public listByUser(userId: number): Review[] {
    return this.reviews.filter((review => review.user.id === userId)).reverse();
  }

  public listByProduct(productId: number): Review[] {
    return this.reviews.filter((review => review.product === productId)).reverse();
  }

  public averageRatingByUser(userId: number): number {
    const reviews = this.listByUser(userId).reverse();
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  }

  public averageRatingByProduct(productId: number): number {
    const reviews = this.listByProduct(productId).reverse();
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  }
}
