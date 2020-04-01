import { Body, Controller, Post, Param, Delete, Get } from '@nestjs/common';
import { SubjectEntity } from '../entities/subject.entity';
import { SubjectDto } from './dto/subject.dto';
import { SubjectService } from './subject.service';

@Controller('subjects')
export class SubjectController {
    constructor(
        private subjectService: SubjectService,
    ){}

    // créer un subject
    @Post()
    create(@Body() subjectDto: SubjectDto) : Promise<SubjectEntity> {
        return this.subjectService.create(subjectDto);
    }
    
    // récupérer tous les subject 
    @Get()
    findAll(){
        return this.subjectService.findAll();
    }
    
    // récupérer un subject
    @Get(':id')
    get(@Param('id') subjectId : number)
    {
        return this.subjectService.get(subjectId);
    }

    // supprimer un subject
    @Delete(':id')
    remove(@Param('id')  subjectId: number) {
        return this.subjectService.delete(subjectId);
    }
    
}
