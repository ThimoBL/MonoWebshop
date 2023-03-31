import {Component, Input, OnInit} from '@angular/core';
import {Manufacturer, Product} from "@mono-webshop/domain";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {ProductService} from "../../../services/product/product.service";
import {ManufacturerService} from "../../../services/manufacturer/manufacturer.service";

@Component({
  selector: 'products-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateProductComponent implements OnInit {
  productId: string;
  product: Product | undefined;
  manufacturers: Manufacturer[] | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductService,
    private manufacturerService: ManufacturerService
  ) {
    // this is for routerLink on same component when only queryParameter changes
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.productId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    if (!this.productId) return;

    this.manufacturerService.list().subscribe(manufacturers => {
      this.manufacturers = manufacturers
    });

    this.productsService.get(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        console.log(this.product.manufacturer);
      },
      error: (err) => {
        console.error(err)

        Swal.fire(
          'Error!',
          'The product could not be loaded! <br /> Reason: ' + err.message,
          'error'
        );
      },
      complete: () => {
        console.log('Product loaded')
      }
    });
  }

  OnSubmit(): void {
    if (!this.product) return;
    console.log(this.product);
    this.productsService.update(this.product._id!, this.product)
      .subscribe({
        next: (product) => {
          console.log(product);
          this.product = product;
        },
        error: (err) => {
          console.error(err)

          Swal.fire(
            'Error!',
            'The product could not be updated! <br /> Reason: ' + err.message,
            'error'
          );
        },
        complete: () => {
          console.log('Product updated')

          this.router.navigate(['/products']);

          Swal.fire(
            'Success',
            'Product successfully updated',
            'success'
          )
        }
      });
  }

  ngOnClose(): void {
    this.router.navigate(['/products']);
  }
}
