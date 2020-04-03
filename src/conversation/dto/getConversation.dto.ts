import { IsNumber} from 'class-validator';

export class GetConversationDto {
  @IsNumber()
  conversationId: number;
}