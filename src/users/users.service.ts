import { Injectable, NotFoundException } from '@nestjs/common';
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
    const users = await this.prisma.user.findMany();

	if (!users.length) {
		throw new NotFoundException("No users found")
	}
  }

  async findOneUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

	return user
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
	// Check if user exists
	const user = await this.prisma.user.findUnique({
		where: { id }
	})

	if (!user) {
		throw new NotFoundException(`Cannot update — user with id ${id} not found`)
	}

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async deleteUser(id: number) {
	// Check if user exists
	const user = await this.prisma.user.findUnique({
		where: { id }
	})
		
	if (!user) {
		throw new NotFoundException(`Cannot update — user with id ${id} not found`)
	}
	

    return this.prisma.user.delete({
      where: { id }
    });
  }

}
