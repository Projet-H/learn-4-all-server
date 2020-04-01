import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ProfileModule } from './profile/profile.module';
import { RegisterModule } from './register/register.module';
import { AuthModule } from './auth/auth.module';
import { DegreeModule } from './degree/degree.module';
import { SubjectModule } from './subject/subject.module';
import { ConversationModule } from './conversation/conversation.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ProfileModule,
    RegisterModule,
    AuthModule,
    DegreeModule,
    SubjectModule,
    ConversationModule

  ],
})
export class AppModule {}