import { IBaseResponse } from '@/interfaces';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse: IBaseResponse<void> = {
      error: true,
      statusCode: status,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
      errors: [],
    };

    response.status(status).json(errorResponse);
  }
}
