import {Component, Input, OnInit} from '@angular/core';
import {Product} from "@mono-webshop/domain";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {ProductService} from "../../../services/product/product.service";

@Component({
  selector: 'products-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateProductComponent implements OnInit {

  @Input()
  productId: string | undefined;
  product: Product = {} as Product;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private productsService: ProductService
  ) {
    // this is for routerLink on same component when only queryParameter changes
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    if (!this.productId) return;

    if (!isNaN(Number(this.productId))) {
      let prodId: number = Number(this.productId);

      this.product = this.productsService.get(prodId);
    } else {
      Swal.fire(
        'Not Found!',
        'The manufacturer has not been found!',
        'error'
      );
    }
  }

  ngOnModalClose(): void {
    this.modalService.dismissAll()
  }

  OnSubmit(): void {
    this.productsService.update(this.product.id, this.product);

    this.ngOnModalClose();

    Swal.fire(
      'Success',
      'Product successfully updated',
      'success'
    )
  }

  ngOnModalOpen(content: any): void {
    this.modalService.open(content);
  }
}
