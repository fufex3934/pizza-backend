import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException as NestHttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCode } from '../constants/error.constants';
import { CustomHttpException } from '../exceptions/custom-http.exceptions';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof CustomHttpException) {
      return response.status(exception.statusCode).json({
        statusCode: exception.statusCode,
        errorCode: exception.errorCode,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        details: exception.details,
      });
    }

    if (exception instanceof NestHttpException) {
      const res = exception.getResponse();
      return response.status(exception.getStatus()).json({
        ...(typeof res === 'object' ? res : { message: res }),
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    console.error(exception);
    return response.status(500).json({
      statusCode: 500,
      errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
