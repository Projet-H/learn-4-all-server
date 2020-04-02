import { Body, Controller, Post, Param, Delete, Get, UseGuards } from '@nestjs/common';
import { SubjectEntity } from '../entities/subject.entity';
import { SubjectDto } from './dto/subject.dto';
import { SubjectService } from './subject.service';
import { UserAuthGuard } from '../auth/roles/user/user.guard';
import { AdminAuthGuard } from '../auth/roles/admin/admin.guard';

@UseGuards(UserAuthGuard)
@Controller('subjects')
export class SubjectController {

    constructor(
        private subjectService: SubjectService,
    ){}

    @Post()
    create(@Body() subjectDto: SubjectDto) : Promise<SubjectEntity> {
        return this.subjectService.create(subjectDto);
    }

    @Get()
    findAll(){
        return this.subjectService.findAll();
    }

    @Get(':id')
    get(@Param('id') subjectId : number)  {
        return this.subjectService.get(subjectId);
    }

    @UseGuards(AdminAuthGuard)
    @Delete(':id')
    remove(@Param('id')  subjectId: number) {
        return this.subjectService.delete(subjectId);
    }

}
