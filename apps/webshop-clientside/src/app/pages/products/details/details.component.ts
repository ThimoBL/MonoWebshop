import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {Order, Product, User} from "@mono-webshop/domain";
import Swal from "sweetalert2";
import {ProductService} from "../../../services/product/product.service";
import {ReviewService} from "../../../services/review/review.service";
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {map, Observable} from "rxjs";
import {AuthService} from "../../../services/auth/auth.service";
import {OrderService} from "../../../services/order/order.service";

@Component({
  selector: 'products-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css', '../products.component.css'],
})
export class DetailsProductComponent implements OnInit {

  productId: string;
  product: Product;
  productEmitter$ = new Observable<Product>;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private productsService: ProductService,
    private reviewService: ReviewService,
    private orderService: OrderService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.productId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    console.log(this.productId);

    this.productsService.get(this.productId).subscribe(
      (product: Product) => {
        this.product = product;
        this.productEmitter$ = this.productsService.get(this.productId);
      }
    );
  }

  OnDelete(reviewId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#198754',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reviewService.delete(reviewId).subscribe({
            next: () => {
              this.productEmitter$ = this.productsService.get(this.productId);
            },
            error: (err) => {
              console.log(err);
              Swal.fire(
                'Error!',
                'Something went wrong: ' + err.message,
                'error'
              );
            },
            complete: () => {
              Swal.fire(
                'Deleted!',
                'The manufacturer has been deleted.',
                'success'
              );

              this.productsService.get(this.productId).subscribe(
                (product: Product) => {
                  this.product = product;
                }
              );
            }
          }
        );
      }
    })
  }

  ngCardClose(): void {
    this.router.navigate(['/products']);
  }

  myCallbackFunction = (): void => {
    this.router.navigate(['/products', this.productId]);
  }

  buyProduct(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, buy it!'
    }).then((result) => {
        if (result.isConfirmed) {
          let userId = '';

          this.authService.getUserId().subscribe(id => userId = id);

          let order: Order = {
            orderDate: new Date(),
            orderNumber: (Math.random() * 1000000).toString(),
            status: 'pending',
            total: 1,
            createdBy: userId,
            orderItems: this.product
          }


          this.orderService.create(order).subscribe({
              next: () => {
                this.productEmitter$ = this.productsService.get(this.productId);
              },
              error: (err) => {
                console.log(err);
                Swal.fire(
                  'Error!',
                  'Something went wrong: ' + err.message,
                  'error'
                );
              },
              complete: () => {
                Swal.fire(
                  'Bought!',
                  'The product has been bought.',
                  'success'
                );

                this.productsService.get(this.productId).subscribe(
                  (product: Product) => {
                    this.product = product;
                  }
                );
              }
            }
          );
        }
      }
    )
  }
}
