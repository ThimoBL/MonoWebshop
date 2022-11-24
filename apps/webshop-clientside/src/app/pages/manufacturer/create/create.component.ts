import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'manufacturer-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateManufacturerComponent implements OnInit {
  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  ngOnModalOpen(content: any): void {
    this.modalService.open(content);
  }

  ngOnModalClose(): void {
    this.modalService.dismissAll()
  }

  OnSubmit(): void {
  }
}
