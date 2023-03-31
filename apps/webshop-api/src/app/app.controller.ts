import {Controller, Request, Post, UseGuards, Get, Logger} from '@nestjs/common';
import {AppService} from "./app.service";
import {AuthService} from "./auth/auth.service";
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {Role} from "@mono-webshop/domain";
import {RolesGuard} from "./auth/roles.guard";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {HasRoles} from "./auth/has-roles.decorator";

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Request() req) {
    Logger.log(`register ${JSON.stringify(req.body)}`);
    return this.authService.login(req.body);
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('init')
  initUsers() {
    return this.authService.initUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.Admin)
  @Get('admin')
  onlyAdmin(@Request() req) {
    return req.user;
  }

  @HasRoles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  onlyUser(@Request() req) {
    return req.user;
  }
}
