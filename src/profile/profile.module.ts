import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DegreeEntity } from '../entities/degree.entity';
import { SubjectEntity } from '../entities/subject.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/jwt/jwt.constant';

@Module({
  controllers: [ProfileController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, DegreeEntity,SubjectEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  providers: [ProfileService]
})
export class ProfileModule {}
