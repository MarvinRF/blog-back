import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';

interface IErrorResponse {
  statusCode: number;
  timestamp?: string;
  path?: string;
  error?: string;
  message: string | string[];
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // Injetar HttpAdapterHost e um Logger
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger = new Logger(AllExceptionsFilter.name), // Logger com contexto
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const defaultMessage = 'Ocorreu um erro interno no servidor.';
    let errorName = 'InternalServerError';
    let messages: string | string[] = defaultMessage;

    if (isHttpException) {
      const exceptionResponse = exception.getResponse();
      errorName = exception.constructor.name; // Usar o nome da classe da exceção

      if (typeof exceptionResponse === 'string') {
        messages = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        // Lidar com a estrutura de erro padrão do NestJS para ValidationPipe, por exemplo
        const typedResponse = exceptionResponse as {
          message: string | string[];
          error?: string;
        };
        messages = typedResponse.message;
        if (typedResponse.error) {
          errorName = typedResponse.error;
        }
      }
    } else if (exception instanceof Error) {
      // Capturar o nome e a mensagem de erros genéricos
      errorName = exception.constructor.name;
      messages = exception.message;
    }

    const errorResponse: IErrorResponse = {
      statusCode: status,
      error: errorName,
      message: messages,
    };

    // Log detalhado do erro
    this.logger.error(
      `HTTP Status: ${status} Error Message: ${JSON.stringify(messages)} Path: ${request.url}`,
      exception instanceof Error ? exception.stack : JSON.stringify(exception), // Logar o stack trace se disponível
      'AllExceptionsFilter', // Contexto do log
    );

    // Usar o httpAdapter para enviar a resposta, garantindo compatibilidade
    // com diferentes adaptadores HTTP (Express, Fastify)
    httpAdapter.reply(response, errorResponse, status);
  }
}
