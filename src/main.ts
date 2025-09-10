import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  const PORT = configService.get<number>('PORT') ?? 3000;

  console.log(`App started on PORT: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
