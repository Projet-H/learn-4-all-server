import { IsString } from 'class-validator';

export class GetConversationsDto {
  @IsString()
  degreeSlug: string;

  @IsString()
  subjectSlug: string;
}