import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../constants/error.constants';

export class CustomHttpException extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: HttpStatus,
    public readonly errorCode: ErrorCode,
    public readonly details?: any,
  ) {
    super(message);
  }
}
