import { IsEmail, IsNotIn, IsNumber, IsString } from 'class-validator';
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
  @IsNotIn([Role.Admin])
  role: Role;
}