import { IsEmail, IsNumber, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  role: Role;
}