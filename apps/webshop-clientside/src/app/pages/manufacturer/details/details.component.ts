import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ManufacturerService} from "@mono-webshop/products-ui";
import {Manufacturer} from "@mono-webshop/domain";
import Swal from "sweetalert2";

@Component({
  selector: 'manufacturer-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css', '../manufacturer.component.css'],
})
export class DetailsManufacturerComponent implements OnInit {

  @Input()
  manufacturerId: string | undefined;
  manufacturer: Manufacturer = {} as Manufacturer;

  constructor(
    private modalService: NgbModal,
    private manufacturerService: ManufacturerService
  ) {}

  ngOnInit(): void {
    if (!this.manufacturerId) return;

    if (!isNaN(Number(this.manufacturerId))) {
      let manufacturerId: number = Number(this.manufacturerId);

      this.manufacturer = this.manufacturerService.get(manufacturerId);
    } else {
      Swal.fire(
        'Not Found!',
        'The manufacturer has not been found!',
        'error'
      );
    }
  }

  ngOnModalOpen(content: any): void {
    this.modalService.open(content);
  }
}
