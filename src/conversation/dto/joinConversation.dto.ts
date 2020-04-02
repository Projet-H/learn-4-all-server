import { IsInt } from 'class-validator';

export class JoinConversationDto {
  @IsInt()
  id: number;
}