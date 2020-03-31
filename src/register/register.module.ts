import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Module({
  controllers: [RegisterController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [TypeOrmModule]
})
export class RegisterModule {}
