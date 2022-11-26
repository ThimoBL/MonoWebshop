import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Manufacturer} from "@mono-webshop/data";
import Swal from "sweetalert2";
import {ManufacturerService} from "../../../../../../../libs/products-ui/src/lib/manufacturer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'manufacturer-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css', '../manufacturer.component.css'],
})
export class UpdateManufacturerComponent implements OnInit {

  @Input()
  manufacturerId: string | undefined;
  manufacturer: Manufacturer = {} as Manufacturer;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private manufacturerService: ManufacturerService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    if (!this.manufacturerId) return;

    if (!isNaN(Number(this.manufacturerId))) {
      let manufactId: number = Number(this.manufacturerId);

      this.manufacturer = this.manufacturerService.get(manufactId);
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
    this.manufacturerService.update(this.manufacturer.id, this.manufacturer);

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
