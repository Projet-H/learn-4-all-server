import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectEntity } from 'src/entities/subject.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DegreeEntity } from '../entities/degree.entity';
import { SubjectService } from './subject.service';

@Module({
  controllers: [SubjectController],
  imports: [TypeOrmModule.forFeature([SubjectEntity, DegreeEntity])],
  exports: [TypeOrmModule],
  providers: [SubjectService]
})
export class SubjectModule {}
