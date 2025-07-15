import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/permissions.decorator';
import { Request } from 'express';
import { ErrorCode } from '../constants/error.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user.permissions) {
      throw new ForbiddenException('No permissions found', ErrorCode.FORBIDDEN);
    }
    const permissions = user.permissions ?? {};
    const hasPermission = requiredRoles.some((role) => permissions[role]);

    if (!hasPermission) {
      throw new ForbiddenException(
        'Insufficient permissions',
        ErrorCode.FORBIDDEN,
      );
    }
    return true;
  }
}
