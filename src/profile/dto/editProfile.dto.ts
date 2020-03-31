import { IsNumber, IsString } from 'class-validator';

export class EditProfileDto {
  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @IsString()
  email: string;

  @IsNumber()
  role: Role;
}