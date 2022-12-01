import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Manufacturer} from "@mono-webshop/domain";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ManufacturerService} from "../../../services/manufacturer/manufacturer.service";

@Component({
  selector: 'manufacturer-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateManufacturerComponent implements OnInit {
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private manufacturerService: ManufacturerService
  ) {
  }

  manufacturer: Manufacturer = {
    id: 0,
    name: '',
    city: '',
    country: '',
    email: '',
    phone: ''
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
    this.manufacturerService.create(this.manufacturer);

    this.ngOnModalClose();

    Swal.fire(
      'Success',
      'Manufacturer successfully created',
      'success'
    )
  }
}
