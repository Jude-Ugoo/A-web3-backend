import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);

  await prismaService.enableShutdownHooks(app); // Connects to the database and closes the connection when the application shuts down.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
