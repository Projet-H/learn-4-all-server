import { IsInt, IsString } from 'class-validator';

export class SubjectDto {
  @IsString()
  name: string;

  @IsString()
  slugdegree: string;
}