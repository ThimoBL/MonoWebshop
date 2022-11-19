import {Component, Input, OnInit} from '@angular/core';
import {Product} from "@mono-webshop/data";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "@mono-webshop/products-ui";
import Swal from "sweetalert2";

@Component({
  selector: 'products-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {

  @Input()
  productId: string | undefined;
  product: Product = {} as Product;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
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
      this.router.navigate(['..']);
    }
  }

  ngOnModalClose(): void {
    this.modalService.dismissAll()
  }

  OnSubmit(): void {
    this.productsService.update(this.product);

    this.ngOnModalClose();

    Swal.fire(
      'Success',
      'Product successfully created',
      'success'
    )

    this.router.navigate(['..']);
  }

  ngOnModalOpen(content: any): void {
    this.modalService.open(content);
  }
}
