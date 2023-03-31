import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import {User} from "@mono-webshop/domain";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: User) {
    return {
      _id: payload._id,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      address: payload.address,
      city: payload.city,
      zipCode: payload.zipCode,
      country: payload.country,
      phone: payload.phone,
      roles: payload.roles,
    };
  }
}
