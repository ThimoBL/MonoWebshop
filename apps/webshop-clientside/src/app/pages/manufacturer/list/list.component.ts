import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Manufacturer} from "@mono-webshop/domain";
import {ManufacturerService} from "../../../services/manufacturer/manufacturer.service";
import {AuthService} from "../../../services/auth/auth.service";


@Component({
  selector: 'manufacturer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css', '../manufacturer.component.css'],
})
export class ListManufacturerComponent implements OnInit {
  Manufacturers: Manufacturer[];

  constructor(
    public authService: AuthService,
    private manufacturerService: ManufacturerService
  ) {}

  ngOnInit(): void {
    this.manufacturerService.list().subscribe(manufacturers => {
      this.Manufacturers = manufacturers
    });
  }

  OnDelete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#198754',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.manufacturerService.delete(id).subscribe({
          next: () => {
            this.Manufacturers = this.Manufacturers.filter(manufacturer => manufacturer._id !== id);
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Something went wrong! <br /> Reason: ' + err.message,
              'error'
            )
          },
          complete: () => {
            Swal.fire(
              'Deleted!',
              'Your manufacturer has been deleted.',
              'success'
            )
          }
        });
      }
    })
  }
}
