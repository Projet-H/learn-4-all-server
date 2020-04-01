import { Body, Controller, Post, Param, Delete, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DegreeEntity } from '../entities/degree.entity';
import { Repository } from 'typeorm';
import { DegreeDto } from './dto/degree.dto';

@Controller('degree')
export class DegreeController {
    constructor(
        @InjectRepository(DegreeEntity)
        private degreesRepository: Repository<DegreeEntity>,
    ){}

    @Post()
    create(@Body() degreeDto: DegreeDto) : Promise<DegreeEntity> {
        const degree = new DegreeEntity();
        Object.assign(degree, degreeDto);
        return this.degreesRepository.save(degree);
    }
    
    // récupérer tous les degrees 
    @Get()
    getall(@Body() degree: DegreeEntity){
        return this.degreesRepository.find();
    }
    
    // récupérer un degree
    @Get(':id')
    getone(@Param('id') degree: DegreeEntity)
    {
        return this.degreesRepository.findOne(degree);     
    }

    // supprimer un degree
    @Delete(':id')
    remove(@Param('id')  degree: DegreeEntity) {
        return this.degreesRepository.delete(degree);     
    }
    
}
