import { Controller, Get, Put, Param, Body, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { EditProfileDto } from './dto/editProfile.dto';
import { ParamsDto } from './dto/params.dto';
import { SubjectsFollowedDto } from './dto/SubjectsFollowed.dto';
import { UserAuthGuard } from '../auth/roles/user/user.guard';
import { EditProfileGuard } from '../auth/roles/edit/editProfile.guard';

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
  @UseGuards(EditProfileGuard)
  editProfile(@Param() params : ParamsDto, @Body() editedProfile: EditProfileDto) {
    return this.profileService.editProfile(params.id, editedProfile);
  }

  @Delete(':id')
  @UseGuards(EditProfileGuard)
  deleteProfile(@Param() params : ParamsDto) {
    return this.profileService.deleteProfile(params.id);
  }

  @Put(':id/subjects')
  @UseGuards(EditProfileGuard)
  editDegreesAndSubjects(@Param() params : ParamsDto, @Body() SubjectsFollowed : SubjectsFollowedDto) {
    return this.profileService.editDegreesAndSubjects(params.id, SubjectsFollowed);
  }

  @Get(':id/conversations')
  @UseGuards(EditProfileGuard)
  getMyConversations(@Param() params : ParamsDto) {
    return this.profileService.getMyConversations(params.id);
  }
}
