import { IsInt } from 'class-validator';

export class SubjectsFollowedDto {
  @IsInt({each: true})
  subjects: number[];
}