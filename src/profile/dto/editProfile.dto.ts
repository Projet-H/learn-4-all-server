import { IsNumber, IsString, IsEmail, IsNotIn } from 'class-validator';
import { Role } from '../../enums/role.enum';

export class EditProfileDto {
  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @IsEmail()
  email: string;

  @IsNumber()
  @IsNotIn([Role.Admin, Role.NONE])
  role: Role;
}