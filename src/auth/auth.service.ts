import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignInDto, } from './dto';

import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
) {}

  async signup(dto: AuthDto) {
    const hashStr = String(dto.hash)
    const hash = await argon2.hash(hashStr)

    try {
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                hash,
            }
        })
        return this.signToken(user.id, user.email);

    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Email already exists')
            }
        }
        throw error
    }
  }

  async signin(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
        where: { email: dto.email }
    })

    if (!user) {
        throw new ForbiddenException('Invalid Credentials')
    }

    const hashStr = String(dto.hash)
    const isHashValid = await argon2.verify(user.hash, hashStr)

    if (!isHashValid) {
        throw new ForbiddenException('Invalid Credemtials')
    }

    return this.signToken(user.id, user.email);
  }

  // Generate User JWT
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
        sub: userId,
        email,
    }
    const secret = this.config.get('ACCESS_TOKEN')!

    const token = await this.jwt.signAsync(payload, {
        secret,
        expiresIn: '15m',
    })

    return { access_token: token }
  }
}
