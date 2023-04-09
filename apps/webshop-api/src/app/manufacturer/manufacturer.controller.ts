import {Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ManufacturerService} from "./manufacturer.service";
import {Manufacturer, Role} from "@mono-webshop/domain";
import {HasRoles} from "../auth/has-roles.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";

@Controller('manufacturers')
export class ManufacturerController {
  constructor(
    private manufacturerService: ManufacturerService
  ) {
  }

  @Get()
  getManufacturers() {
    Logger.log(`get manufacturers`);
    return this.manufacturerService.list();
  }

  @Get(':id')
  getManufacturer(@Param('id') id: string) {
    Logger.log(`get manufacturer ${id}`);
    return this.manufacturerService.get(id);
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createManufacturer(@Body() manufacturer: Manufacturer) {
    Logger.log(`create manufacturer ${manufacturer.name}`);
    return this.manufacturerService.create(manufacturer);
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  updateManufacturer(@Param('id') id: string, @Body() manufacturer: Manufacturer) {
    Logger.log(`update manufacturer ${id}`);
    return this.manufacturerService.update(id, manufacturer);
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteManufacturer(@Param('id') id: string) {
    Logger.log(`delete manufacturer ${id}`);
    return this.manufacturerService.delete(id);
  }
}
