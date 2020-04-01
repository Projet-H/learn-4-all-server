import { IsNumber, IsString, IsEmail } from 'class-validator';
import { Role } from '../../enums/role.enum';

export class EditProfileDto {
  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @IsEmail()
  email: string;

  @IsNumber()
  role: Role;
}