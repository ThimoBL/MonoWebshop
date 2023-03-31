import {Component, OnInit} from '@angular/core';
import {Product, Role} from "@mono-webshop/domain";
import Swal from "sweetalert2";
import {ProductService} from "../../../services/product/product.service";
import {Review} from "@mono-webshop/domain";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'products-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css', '../products.component.css']
})
export class ListProductComponent implements OnInit {
  Products: Product[];


  avgRating(reviews: Review[]): number {
    let ratings: number[] = reviews?.map(review => review.rating) || [];
    let sum = ratings.reduce((a, b) => a + b, 0);
    return sum / (ratings?.length || 1);
  }

  constructor(
    private productsService: ProductService,
    public authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.productsService.list().subscribe({
      next: (products) => {
        this.Products = products;
      },
      error: (err) => {
        Swal.fire(
          'Error!',
          'Something went wrong! <br /> Reason: ' + err.message,
          'error'
        )
      },
      complete: () => {
        console.log('Products loaded');
      }
    });
  }

  OnDelete(id: string) {
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

        this.productsService.delete(id).subscribe({
          next: () => {
            this.Products = this.Products.filter(product => product._id !== id);
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Something went wrong! <br /> Reason: ' + err.message,
              'error'
            )
          },
          complete: () => {
            Swal.fire(
              'Deleted!',
              'Your product has been deleted.',
              'success'
            )
          }
        });
      }
    })
  }
}
