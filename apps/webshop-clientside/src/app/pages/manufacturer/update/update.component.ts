import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Manufacturer} from "@mono-webshop/domain";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {ManufacturerService} from "../../../services/manufacturer/manufacturer.service";

@Component({
  selector: 'manufacturer-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css', '../manufacturer.component.css'],
})
export class UpdateManufacturerComponent implements OnInit {

  manufacturerId: string | null;
  manufacturer: Manufacturer | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manufacturerService: ManufacturerService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.manufacturerId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (!this.manufacturerId) return;

    this.manufacturerService.get(this.manufacturerId).subscribe({
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

  OnSubmit(): void {
    if (!this.manufacturer || !this.manufacturer._id) return;

    this.manufacturerService.update(this.manufacturer._id, this.manufacturer)
      .subscribe({
        next: (manufacturer) => {
          this.manufacturer = manufacturer;
        },
        error: (err) => {
          Swal.fire(
            'Error!',
            'The manufacturer could not be updated! <br /> Reason: ' + err.message,
            'error'
          );
        },
        complete: () => {
          Swal.fire(
            'Success!',
            'The manufacturer was updated successfully!',
            'success'
          );

          this.router.navigate(['/manufacturers']);
        }
      });
  }

  ngOnClose(): void {
    this.router.navigate(['/manufacturers']);
  }
}
