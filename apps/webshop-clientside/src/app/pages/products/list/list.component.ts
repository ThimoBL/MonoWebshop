import { Component, OnInit } from '@angular/core';
import {Product} from "@mono-webshop/domain";
import Swal from "sweetalert2";
import {ProductService} from "../../../services/product/product.service";
import {Review} from "../../../../../../../libs/domain/src/lib/Review.interface";

@Component({
  selector: 'products-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css', '../products.component.css']
})
export class ListProductComponent implements OnInit {
  Products: Product[] | undefined;

  avgRating(reviews: Review[]): number {
    let ratings: number[] = reviews.map(review => review.rating);
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  }

  constructor(
    private productsService: ProductService
  ) {}

  ngOnInit(): void {
    this.Products = this.productsService.list();
  }

  OnDelete(id: number) {
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
        this.productsService.delete(id);

        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        )
      }
    })
  }
}
