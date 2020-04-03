import { Body, Controller, Post, Param, Delete, Get, UseGuards, Put } from '@nestjs/common';
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
    getAllActive(){
        return this.subjectService.getAll(true);
    }

    @Get('/inactive')
    @UseGuards(AdminAuthGuard)
    getAllInactive(){
        return this.subjectService.getAll(false);
    }

    @Get(':id')
    get(@Param('id') subjectId : number)  {
        return this.subjectService.get(subjectId);
    }

    @Put(':id')
    @UseGuards(AdminAuthGuard)
    active(@Param('id') id: number) {
        return this.subjectService.active(id);
    }

    @UseGuards(AdminAuthGuard)
    @Delete(':id')
    remove(@Param('id')  subjectId: number) {
        return this.subjectService.delete(subjectId);
    }

}
