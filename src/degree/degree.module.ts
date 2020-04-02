import { Module } from '@nestjs/common';
import { DegreeEntity } from '../entities/degree.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DegreeController } from './degree.controller';
import { DegreeService } from './degree.service';

@Module({
  controllers: [DegreeController],
  imports: [TypeOrmModule.forFeature([DegreeEntity])],
  exports: [TypeOrmModule],
  providers: [DegreeService]
})
export class DegreeModule {}
