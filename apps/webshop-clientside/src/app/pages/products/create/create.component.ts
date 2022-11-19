import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ProductsService} from "@mono-webshop/products-ui";
import {Product} from "@mono-webshop/data";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'products-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class CreateComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private productsService: ProductsService) {
  }

  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    size: ''
  }

  ngOnInit(): void {}

  ngOnModalOpen(content: any): void {
    this.modalService.open(content);
  }

  ngOnModalClose(): void {
    this.modalService.dismissAll()
  }

  OnSubmit(): void {
    this.productsService.create(this.product);

    this.ngOnModalClose();

    Swal.fire(
      'Success',
      'Product successfully created',
      'success'
    )

    this.router.navigate([".."]);
  }
}
