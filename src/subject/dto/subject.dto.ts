import { IsInt, IsString } from 'class-validator';

export class SubjectDto {
  @IsString()
  name: string;

  @IsInt()
  degreeId: number;
}