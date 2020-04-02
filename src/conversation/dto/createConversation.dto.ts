import { IsString } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  subjectSlug: string;

  @IsString()
  degreeSlug: string;
}