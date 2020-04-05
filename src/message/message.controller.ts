import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { AdminAuthGuard } from '../auth/roles/admin/admin.guard';

@Controller('messages')
@UseGuards(AdminAuthGuard)
export class MessageController {
  constructor( private readonly messageService : MessageService) {}

  @Get('reported')
  getAllReported() {
    return this.messageService.getAllReported();
  }

  @Put(':id/reject-report')
  rejectReport(@Param('id') messageId: number) {
    return this.messageService.rejectReport(messageId);
  }

  @Delete(':id/accept-report')
  acceptReport(@Param('id') messageId: number) {
    return this.messageService.acceptReport(messageId);
  }
}
