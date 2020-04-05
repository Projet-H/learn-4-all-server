import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditProfileDto } from './dto/editProfile.dto';
import { SubjectsFollowedDto } from './dto/SubjectsFollowed.dto';
import { DegreeEntity } from '../entities/degree.entity';
import { SubjectEntity } from '../entities/subject.entity';

import slug from 'slugify';
import { Role } from '../enums/role.enum';
import { UserNotFoundException } from './exceptions/userNotFound.exception';
import { JwtService } from '@nestjs/jwt';
import { ConversationEntity } from '../entities/conversation.entity';


@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(DegreeEntity)
    private degreeRepository: Repository<DegreeEntity>,

    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    @InjectRepository(ConversationEntity)
    private conversationRepository: Repository<ConversationEntity>,
    private jwtService: JwtService
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getProfile(id : number) {
    const user = await this.userRepository.findOne(id, {relations: ['subjects']});
    if(!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  async editProfile(id : number, editedProfile: EditProfileDto) {
    const user = await this.userRepository.findOne({id});
    if(!user) {
      throw new UserNotFoundException(id);
    }

    if(editedProfile.lastName && editedProfile.firstName) {
      user.slug = slug(editedProfile.lastName.concat(' ', editedProfile.firstName)).toLowerCase();
    }

    if (ProfileService.isRoleAlreadySet(user)) {
      editedProfile.role = user.role;
    }
    Object.assign(user, editedProfile);
    const userUpdated : UserEntity = await this.userRepository.save(user);
    const payload = { email: userUpdated.email, id: userUpdated.id, role: userUpdated.role };
    return {accessToken: this.jwtService.sign(payload)};
  }

  async deleteProfile(id : number) {
    return await this.userRepository.delete({id: id});
  }

  async editDegreesAndSubjects(id : number, subjectsFollowedDto : SubjectsFollowedDto ) {
    const subjects = await this.subjectRepository.findByIds(subjectsFollowedDto.subjects);
    const user = await this.userRepository.findOne(id, {relations: ['subjects']});
    if(!user) {
      throw new UserNotFoundException(id);
    }
    for (const subject of subjects) {
      user.subjects.push(subject);
    }
    return await this.userRepository.save(user);
  }

  async getMyConversations(userId : number) {
    const user = await this.userRepository.findOne(userId, {relations: [
      'conversationWithStudents', 'conversationWithStudents.subject', 'conversationWithStudents.subject.degree',
        'conversationWithTeachers', 'conversationWithTeachers.subject', 'conversationWithTeachers.subject.degree',
      ]});

    if(!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    if(user.role == Role.Teacher) {
      return user.conversationWithStudents;
    } else {
      return user.conversationWithTeachers;
    }
  }

  private static isRoleAlreadySet(user: UserEntity) : boolean {
    return user.role != Role.NONE;
  }



}
