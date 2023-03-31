import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Manufacturer, Product, User} from "@mono-webshop/domain";
import Swal from 'sweetalert2';
import {ManufacturerService} from "../../../services/manufacturer/manufacturer.service";
import {ProductService} from "../../../services/product/product.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'products-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class CreateProductComponent implements OnInit {
  // selectedManufacturer: string | null;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService,
    private productsService: ProductService,
    private manufacturerService: ManufacturerService
  ) {
    // this.selectedManufacturer = null;
  }

  product: Product = {
    name: '',
    description: '',
    price: 0,
    image: '',
    size: '',
    reviews: [],
    manufacturer: '',
    createdBy: ''
  }

  manufacturers: Manufacturer[] | undefined;

  ngOnInit(): void {
    this.manufacturerService.list().subscribe(manufacturers => {
      this.manufacturers = manufacturers
    });
  }

  ngOnModalOpen(content: any): void {
    this.modalService.open(content);
  }

  ngOnModalClose(): void {
    this.modalService.dismissAll()
  }

  OnSubmit(): void {
    this.authService.getUserId().subscribe(id => this.product.createdBy = id);
    this.productsService.create(this.product).subscribe({
      next: (product: Product) => {
        console.log(product);
        Swal.fire({
          title: 'Success!',
          text: 'Product created successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          this.ngOnModalClose();
          this.router.navigate(['/']);
        });
      },
      error: (err) => {
        console.error(err);

        Swal.fire(
          'Error!',
          'The product could not be created! <br /> Reason: ' + err.message,
          'error'
        );
      },
      complete: () => {
        console.log('Product created')
      }
    })
  }
}
