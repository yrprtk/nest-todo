import {
  Catch,
  Inject,
  HttpStatus,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from 'src/common/errors/domain.error';
import { LOGGER_CONSTANTS } from 'src/logger/logger.constants';
import { ILoggerService } from 'src/logger/interfaces/logger-service.interface';

@Catch()
export class ErrorToHttpExceptionFilter implements ExceptionFilter {
  private readonly internalServerError = new Error('Internal server error');

  constructor(
    @Inject(LOGGER_CONSTANTS.APPLICATION.SERVICE_TOKEN)
    private readonly loggerService: ILoggerService,
  ) {
    this.internalServerError.name = 'INTERNAL_SERVER_ERROR';
  }

  public catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const timestamp = new Date().toISOString();
    const path = request.url;

    this.loggerService.capture(exception);

    if (exception instanceof DomainError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        path,
        timestamp,
        statusCode: HttpStatus.BAD_REQUEST,
        error: {
          name: exception.name,
          message: exception.message,
        },
      });
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      path,
      timestamp,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: {
        name: this.internalServerError.name,
        message: this.internalServerError.message,
      },
    });
  }
}
