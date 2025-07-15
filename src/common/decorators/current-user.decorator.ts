import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user: TokenPayload;
  }
}

export const CurrentUser = createParamDecorator(
  (data: keyof TokenPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user) {
      return null;
    }
    if (data) {
      return user[data];
    }
    return user;
  },
);
