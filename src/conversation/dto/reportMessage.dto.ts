import { IsNumber} from 'class-validator';

export class ReportMessageDto {
  @IsNumber()
  id: string;

}