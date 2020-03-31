import { IsEmail, IsNumber, IsString } from 'class-validator';

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