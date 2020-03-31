import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectEntity } from 'src/entities/subject.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SubjectController],
  imports: [TypeOrmModule.forFeature([SubjectEntity])],
  exports: [TypeOrmModule]
})
export class SubjectModule {}
