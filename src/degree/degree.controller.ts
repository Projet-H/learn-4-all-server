import { Body, Controller, Post, Param, Delete, Get, UseGuards, Put } from '@nestjs/common';
import { DegreeEntity } from '../entities/degree.entity';
import { DegreeDto } from './degree.dto';
import { UserAuthGuard } from '../auth/roles/user/user.guard';
import { AdminAuthGuard } from '../auth/roles/admin/admin.guard';
import { DegreeService } from './degree.service';

@UseGuards(UserAuthGuard)
@Controller('degree')
export class DegreeController {

    constructor(private degreeService: DegreeService){}

    @Post()
    create(@Body() degreeDto: DegreeDto) : Promise<DegreeEntity> {
        return this.degreeService.create(degreeDto);
    }

    @Get()
    getAllActive() {
        return this.degreeService.getAll(true);
    }

    @Get('/inactive')
    @UseGuards(AdminAuthGuard)
    getAllInactive() {
        return this.degreeService.getAll(false);
    }

    @Get(':slug')
    getOne(@Param('slug') slug: string) {
        return this.degreeService.getOne(slug);
    }

    @Put(':id')
    @UseGuards(AdminAuthGuard)
    active(@Param('id') id: number) {
        return this.degreeService.active(id);
    }

    @Delete(':id')
    @UseGuards(AdminAuthGuard)
    remove(@Param('id') id: number) {
        return this.degreeService.remove(id);
    }
    
}
