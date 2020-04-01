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


@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(DegreeEntity)
    private degreeRepository: Repository<DegreeEntity>,

    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({});
  }

  async getProfile(id : number) {
    const user = await this.userRepository.findOne({id});
    if(!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async editProfile(id : number, editedProfile: EditProfileDto) {
    const user = await this.userRepository.findOne({id});
    if(!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    if(editedProfile.lastName && editedProfile.firstName) {
      user.slug = slug(editedProfile.lastName.concat(' ', editedProfile.firstName)).toLowerCase();
    }

    if (user.role != Role.NONE) {
      editedProfile.role = user.role;
    }
    Object.assign(user, editedProfile);
    await this.userRepository.save(user);
    return user;
  }

  async deleteProfile(id : number) {
    await this.userRepository.delete({id});
    return {};
  }

  async editDegreesAndSubjects(id : number, subjectsFollowedDto : SubjectsFollowedDto ) {
    const subjects = await this.subjectRepository.findByIds(subjectsFollowedDto.subjects);
    const user = await this.userRepository.findOne(id, {relations: ['subjects']});
    if(!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    for (const subject of subjects) {
      user.subjects.push(subject);
    }
    await this.userRepository.save(user);
    return user;
  }

}
