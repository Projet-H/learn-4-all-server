import { Body, Controller, Post, Param, Delete, Get, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DegreeEntity } from '../entities/degree.entity';
import { Repository } from 'typeorm';
import { DegreeDto } from './degree.dto';
import { UserAuthGuard } from '../auth/roles/user/user.guard';
import { AdminAuthGuard } from '../auth/roles/admin/admin.guard';

@UseGuards(UserAuthGuard)
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

    @Get()
    getAll(){
        return this.degreesRepository.find();
    }

    @Get(':slug')
    getOne(@Param('slug') slug: string) {
        return this.degreesRepository.findOne({slug: slug}, {relations: ['subjects']});
    }

    @Delete(':id')
    @UseGuards(AdminAuthGuard)
    remove(@Param('id')  id: number) {
        return this.degreesRepository.delete(id);
    }
    
}
