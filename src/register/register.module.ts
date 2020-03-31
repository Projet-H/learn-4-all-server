import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { RegisterService } from './register.service';

@Module({
  controllers: [RegisterController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [TypeOrmModule],
  providers: [RegisterService]
})
export class RegisterModule {}
