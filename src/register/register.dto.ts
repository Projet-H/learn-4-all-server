import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}