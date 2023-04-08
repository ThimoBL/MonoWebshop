import {Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards} from '@nestjs/common';
import {OrderService} from "./order.service";
import {HasRoles} from "../auth/has-roles.decorator";
import {Order, Role} from "@mono-webshop/domain";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) {
  }

  @Get('test')
  test() {
    return 'test';
  }

  @Get()
  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getOrders() {
    Logger.log(`get orders`);
    return this.orderService.list();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOrder(@Param('id') id: string) {
    Logger.log(`get order ${id}`);
    return this.orderService.get(id);
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard)
  getOrdersByUser(@Param('id') id: string) {
    Logger.log(`get orders by user ${id}`);
    return this.orderService.listByUser(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createOrder(@Body() order: Order) {
    Logger.log(`create order ${order.orderNumber}`);
    return this.orderService.create(order);
  }

  @Put(':id')
  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateOrder(@Param('id') id: string, @Body() order: Order) {
    Logger.log(`update order ${id}`);
    return this.orderService.update(id, order);
  }

  @Delete(':id')
  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteOrder(@Param('id') id: string) {
    Logger.log(`delete order ${id}`);
    return this.orderService.delete(id);
  }
}
