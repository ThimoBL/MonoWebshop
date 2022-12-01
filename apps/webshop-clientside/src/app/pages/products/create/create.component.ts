import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Manufacturer, Product} from "@mono-webshop/domain";
import Swal from 'sweetalert2';
import {ManufacturerService} from "../../../services/manufacturer/manufacturer.service";
import {ProductService} from "../../../services/product/product.service";

@Component({
  selector: 'products-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class CreateProductComponent implements OnInit {
  selectedManufacturer: string | null;

  constructor(
    private modalService: NgbModal,
    private productsService: ProductService,
    private manufacturerService: ManufacturerService
    )
  {
    this.selectedManufacturer = null;
  }

  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    size: '',
    manufacturer: {} as Manufacturer
  }

  manufacturers: Manufacturer[] | undefined;

  ngOnInit(): void {
    this.manufacturers = this.manufacturerService.list();
  }

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
  }
}
