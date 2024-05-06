import { IBaseErrorResponse, IBaseResponse } from '@/interfaces';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { Request, Response } from 'express';

interface IHttpErrorResponse {
  message: IBaseErrorResponse[];
  error: string;
  statusCode: number;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  private handlGetErrors(response: object | string): IBaseErrorResponse[] {
    let errors: IBaseErrorResponse[] = [];

    // Error response is array
    if (typeof response === 'object') {
      const errorResponse = response as IHttpErrorResponse;
      errors = errorResponse.message;
    }

    // Error response is string
    if (typeof response === 'string') {
      errors = [{ errorCode: -1, errorMessage: response }];
    }

    return errors;
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Logging error
    this.logger.error(`{ Error when starting on ${request.url} path }`);
    console.log(exception.getResponse());

    const errorResponse: IBaseResponse<void> = {
      error: true,
      statusCode: status,
      message: exception.message,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      errors: this.handlGetErrors(exception.getResponse()),
    };

    response.status(status).json(errorResponse);
  }
}
