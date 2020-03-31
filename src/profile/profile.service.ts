import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditProfileDto } from './dto/editProfile.dto';
import slug from 'slugify';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
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
    Object.assign(user, editedProfile);

    await this.userRepository.save(user);
    return user;
  }

  async deleteProfile(id : number) {
    await this.userRepository.delete({id});
    return {};
  }

}
