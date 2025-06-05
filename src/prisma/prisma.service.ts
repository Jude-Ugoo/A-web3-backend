import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  // Connects to the database when the module initializes.
  async onModuleInit() {
    await this.$connect();
  }

  // Closes the connection to the database when the application shuts down.
  async enableShutdownHooks(app: INestApplication) {
    // Handle graceful shutdown using process events
    process.on('SIGINT', async () => {
      await this.$disconnect();
      await app.close();
      process.exit(0);
    });
  }
}
