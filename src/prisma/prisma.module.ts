import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global() // Makes the PrismaService available globally across the application.
@Module({
    providers: [PrismaService], // Registers the PrismaService as a provider in the module.
    exports: [PrismaService], // Allows other modules to import PrismaService.
})

export class PrismaModule {}