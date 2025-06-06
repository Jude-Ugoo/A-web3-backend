import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  lastName: string;
}
