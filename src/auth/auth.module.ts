import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { jwtConstants } from './jwt/jwt.constant';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { TeacherStrategy } from './roles/teacher/teacher.strategy';
import { StudentStrategy } from './roles/student/student.strategy';
import { AdminStrategy } from './roles/admin/admin.strategy';
import { UserStrategy } from './roles/user/user.strategy';
import { RoleService } from './roles/role.service';
import { WebSocketStrategy } from './roles/socket/webSocket.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  exports: [TypeOrmModule],
  providers: [AuthService, LocalStrategy, TeacherStrategy, StudentStrategy, AdminStrategy, UserStrategy, RoleService, WebSocketStrategy],
})
export class AuthModule {}
