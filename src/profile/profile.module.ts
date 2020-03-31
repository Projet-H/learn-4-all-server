import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DegreeEntity } from '../entities/degree.entity';
import { SubjectEntity } from '../entities/subject.entity';

@Module({
  controllers: [ProfileController],
  imports: [TypeOrmModule.forFeature([UserEntity, DegreeEntity,SubjectEntity])],
  providers: [ProfileService]
})
export class ProfileModule {}
