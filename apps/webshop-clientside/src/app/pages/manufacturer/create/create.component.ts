import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Manufacturer} from "@mono-webshop/domain";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ManufacturerService} from "../../../services/manufacturer/manufacturer.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'manufacturer-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateManufacturerComponent implements OnInit {
  constructor(
    private router: Router,
    private modalService: NgbModal,
    public authService: AuthService,
    private manufacturerService: ManufacturerService
  ) {
  }

  manufacturer: Manufacturer = {
    name: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    products: [],
    createdBy: ''
  };

  ngOnInit(): void {
  }

  ngOnModalOpen(content: any): void {
    this.modalService.open(content);
  }

  ngOnModalClose(): void {
    this.modalService.dismissAll()
  }

  OnSubmit(): void {
    this.authService.getUserId().subscribe(id => this.manufacturer.createdBy = id);

    this.manufacturerService.create(this.manufacturer).subscribe({
      next: (manufacturer: Manufacturer) => {
        console.log(manufacturer);

        Swal.fire({
          title: 'Success!',
          text: 'Manufacturer is created.',
          icon: 'success',
          confirmButtonText: 'OK'
        })

        this.ngOnModalClose();
        this.router.navigate(['/']);
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    });


    Swal.fire(
      'Success',
      'Manufacturer successfully created',
      'success'
    )
  }
}
