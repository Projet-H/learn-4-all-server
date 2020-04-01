import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';

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