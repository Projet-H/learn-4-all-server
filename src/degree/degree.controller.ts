import { Body, Controller, Post, Param, Delete, Get, UseGuards } from '@nestjs/common';
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
    getAll() {
        return this.degreeService.getAll();
    }

    @Get(':slug')
    getOne(@Param('slug') slug: string) {
        return this.degreeService.getOne(slug);
    }

    @Delete(':id')
    @UseGuards(AdminAuthGuard)
    remove(@Param('id')  id: number) {
        return this.degreeService.remove(id);
    }
    
}
