import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get('health')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Get('config')
  getConfig(): { nodeEnv: string; port: number; databaseUrl: string } {
    return {
      nodeEnv: this.configService.get<string>('nodeEnv') ?? 'development',
      port: this.configService.get<number>('port') ?? 3000,
      databaseUrl: this.configService.get<string>('databaseUrl') ?? '',
    };
  }
}
