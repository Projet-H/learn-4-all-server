import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubjectEntity } from '../entities/subject.entity';
import { SubjectDto } from './dto/subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DegreeEntity } from '../entities/degree.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectsRepository: Repository<SubjectEntity>,
    @InjectRepository(DegreeEntity)
    private degreeRepository: Repository<DegreeEntity>,
  ){}

  async create(subjectDto: SubjectDto) {
    const subject = new SubjectEntity();
    subject.degree = await this.degreeRepository.findOne(subjectDto.degreeId);
    Object.assign(subject, subjectDto);
    return this.subjectsRepository.save(subject);
  }

  async findAll() {
    return await this.subjectsRepository.find({});
  }

  async get(id: number) {
    const subject = await this.subjectsRepository.findOne(id);
    if(!subject) {
      throw new HttpException('Subject not found.', HttpStatus.NOT_FOUND);
    }
    return subject;
  }

  async delete(id: number){
    await this.subjectsRepository.delete(id);
    return {};
  }
}
