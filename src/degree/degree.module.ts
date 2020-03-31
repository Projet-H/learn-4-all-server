import { Module } from '@nestjs/common';
import { DegreeEntity } from '../entities/degree.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DegreeController } from './degree.controller';

@Module({
   controllers: [DegreeController],
   imports: [TypeOrmModule.forFeature([DegreeEntity])],
  exports: [TypeOrmModule]
})
export class DegreeModule {}
