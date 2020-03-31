import { IsNumberString, IsNotEmpty } from 'class-validator';

export class ParamsDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}