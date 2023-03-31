import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Manufacturer} from "@mono-webshop/domain";
import Swal from "sweetalert2";
import {ManufacturerService} from "../../../services/manufacturer/manufacturer.service";

@Component({
  selector: 'manufacturer-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css', '../manufacturer.component.css'],
})
export class DetailsManufacturerComponent implements OnInit {

  @Input()
  manufacturerId: string | undefined;
  manufacturer: Manufacturer;

  constructor(
    private modalService: NgbModal,
    private manufacturerService: ManufacturerService
  ) {
  }

  ngOnInit(): void {
    if (!this.manufacturerId) return;

    this.manufacturerService.get(this.manufacturerId)
      .subscribe({
        next: (manufacturer) => {
          this.manufacturer = manufacturer;
        },
        error: (err) => {
          Swal.fire(
            'Error!',
            'The manufacturer could not be loaded! <br /> Reason: ' + err.message,
            'error'
          );
        },
        complete: () => {
          console.log('Manufacturer loaded')
        }
    });
  }

  ngOnModalOpen(content: any): void {
    this.modalService.open(content);
  }
}
