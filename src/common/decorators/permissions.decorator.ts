import { SetMetadata } from '@nestjs/common';
import { Permissions } from '../constants/permissions.constants';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Permissions[]) => SetMetadata(ROLES_KEY, roles);
