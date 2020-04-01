import { Body, Controller, Post, Param, Delete, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from '../entities/subject.entity';
import { Repository } from 'typeorm';

@Controller('subject')
export class SubjectController {


    constructor(
        @InjectRepository(SubjectEntity)
        private subjectsRepository: Repository<SubjectEntity>,
    ){}

    // créer un subject
    @Post()
    create(@Body() subject: SubjectEntity) : Promise<SubjectEntity> {
      return this.subjectsRepository.save(subject);
    }
    
    // récupérer tous les subject 
    @Get()
    getall(@Body() subject: SubjectEntity){
        return this.subjectsRepository.find();
    }
    
    // récupérer un subject
    @Get(':id')
    getone(@Param('id') subject: SubjectEntity)
    {
        return this.subjectsRepository.findOne(subject);     
    }

    // supprimer un subject
    @Delete(':id')
    remove(@Param('id')  subject: SubjectEntity) {
        return this.subjectsRepository.delete(subject);     
    }
    
}
