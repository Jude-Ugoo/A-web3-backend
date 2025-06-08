import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips properties not in the DTO
    forbidNonWhitelisted: true, //  throw error if unexpected props found
    transform: true, // auto-transform payloads to DTO instances
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
