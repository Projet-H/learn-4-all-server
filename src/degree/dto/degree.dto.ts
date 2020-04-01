import { IsString } from 'class-validator';

export class DegreeDto {
  @IsString()
  name: string;
}
