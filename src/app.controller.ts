import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService, // Injects the ConfigService.
    private readonly prismaService: PrismaService, // Injects the PrismaService.
  ) {}

  // Get the health of the application.
  @Get('health')
  getHealth(): string {
    return this.appService.getHealth();
  }

  // Get the configuration of the application.
  @Get('config')
  getConfig(): { nodeEnv: string; port: number; databaseUrl: string } {
    return {
      nodeEnv: this.configService.get<string>('nodeEnv') ?? 'development',
      port: this.configService.get<number>('port') ?? 3000,
      databaseUrl: this.configService.get<string>('databaseUrl') ?? '',
    };
  }

  // Test the connection to the database.
  @Get('prisma-test')
  async getPrismaTest(): Promise<{ status: string }> {
    await this.prismaService.$queryRaw`SELECT 1`;
    return { status: 'Prisma Connected' };
  }
}
