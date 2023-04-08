import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {OrderService} from "../../../services/order/order.service";
import {Order} from "@mono-webshop/domain";

@Component({
  selector: 'mono-webshop-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListOrdersComponent implements OnInit {
  Orders: Order[];
  userId: string;

  constructor(
    public authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe(id => this.userId = id);

    this.orderService.listByUser(this.userId).subscribe(orders => {
      this.Orders = orders;
      console.log(this.Orders)
    });
  }
}
