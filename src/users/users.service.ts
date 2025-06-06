import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // async createUser(createUserDto: CreateUserDto) {
  //   return this.prisma.user.create({
  //     data: {
  //       email: createUserDto.email,
  //       firstName: createUserDto.firstName,
  //       lastName: createUserDto.lastName,
  //     },
  //   });
  // }

  async findAllUsers() {
    return this.prisma.user.findMany();
  }

  async findOneUser(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id }
    });
  }

}
