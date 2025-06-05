import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { parseCorsWhiteList } from './common/utils/parse-cors-whitelist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  const CorsWhiteList = parseCorsWhiteList(process.env.CORS_WHITELIST ?? '');

  app.enableCors({
    origin: (
      origin: string | undefined, // Isso é do navegador e para proteger o cliente
      callback: (...args: any[]) => void,
    ) => {
      // Requisição sem origin ou que inclui uma origem conhecida
      // por corsWhiteLists é permitida
      if (!origin || CorsWhiteList.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Lança um erro se propriedades não permitidas forem enviadas
    }),
  );

  await app.listen(process.env.APP_PORT ?? 3001);
}
void bootstrap();
