import { IsInt, IsNotEmpty } from 'class-validator';

export class ParamsDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}