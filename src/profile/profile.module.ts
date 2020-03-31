import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Module({
  controllers: [ProfileController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [ProfileService]
})
export class ProfileModule {}
