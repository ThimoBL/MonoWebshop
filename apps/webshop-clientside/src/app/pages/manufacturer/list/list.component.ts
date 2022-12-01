import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Manufacturer} from "@mono-webshop/domain";
import {ManufacturerService} from "../../../services/manufacturer/manufacturer.service";


@Component({
  selector: 'manufacturer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css', '../manufacturer.component.css'],
})
export class ListManufacturerComponent implements OnInit {
  Manufacturers: Manufacturer[] | undefined;

  constructor(
    private manufacturerService: ManufacturerService
  ) {}

  ngOnInit(): void {
    this.Manufacturers = this.manufacturerService.list();
  }

  OnDelete(id: number) {
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
        this.manufacturerService.delete(id);

        Swal.fire(
          'Deleted!',
          'The manufacturer has been deleted.',
          'success'
        )
      }
    })
  }
}
