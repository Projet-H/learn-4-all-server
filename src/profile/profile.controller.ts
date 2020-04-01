import { Controller, Get, Put, Param, Body, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { EditProfileDto } from './dto/editProfile.dto';
import { ParamsDto } from './dto/params.dto';
import { SubjectsFollowedDto } from './dto/SubjectsFollowed.dto';
import { UserAuthGuard } from '../auth/roles/user/user.guard';

@Controller('profiles')
@UseGuards(UserAuthGuard)
export class ProfileController {

  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  getProfile(@Param() params : ParamsDto) {
    return this.profileService.getProfile(params.id);
  }

  @Put(':id')
  editProfile(@Param() params : ParamsDto, @Body() editedProfile: EditProfileDto) {
    return this.profileService.editProfile(params.id, editedProfile);
  }

  @Delete(':id')
  deleteProfile(@Param() params : ParamsDto) {
    return this.profileService.deleteProfile(params.id);
  }

  @Put(':id/subjects')
  editDegreesAndSubjects(@Param() params : ParamsDto, @Body() SubjectsFollowed : SubjectsFollowedDto) {
    return this.profileService.editDegreesAndSubjects(params.id, SubjectsFollowed);
  }
}
