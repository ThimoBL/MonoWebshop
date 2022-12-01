import { SetMetadata } from '@nestjs/common';
import {Role} from "@mono-webshop/domain";

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);
