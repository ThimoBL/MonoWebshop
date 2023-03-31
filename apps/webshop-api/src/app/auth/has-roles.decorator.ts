import { SetMetadata } from '@nestjs/common';
import {Role} from "@mono-webshop/domain";

export const ROLES_KEY = 'roles';
export const HasRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
