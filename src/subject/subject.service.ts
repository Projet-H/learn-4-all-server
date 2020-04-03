import { Injectable } from '@nestjs/common';
import { SubjectEntity } from '../entities/subject.entity';
import { SubjectDto } from './dto/subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DegreeEntity } from '../entities/degree.entity';
import { SubjectNotFoundException } from './exceptions/subjectNotFound.exception';

@Injectable()
export class SubjectService {

  constructor(
    @InjectRepository(SubjectEntity)
    private subjectsRepository: Repository<SubjectEntity>,
    @InjectRepository(DegreeEntity)
    private degreeRepository: Repository<DegreeEntity>,
  ){}

  async create(subjectDto: SubjectDto) {
    const degree = await this.degreeRepository.findOne({slug: subjectDto.slugDegree});
    const subject = new SubjectEntity();
    Object.assign(subject, subjectDto);
    subject.degree = degree;
    return this.subjectsRepository.save(subject);
  }

  async getAllActive(degreeSlug: string) {
    const degree: DegreeEntity = await this.degreeRepository.findOne({slug: degreeSlug});
    return this.subjectsRepository.find({active: true, degree: degree});
  }

  getAllInactive() {
    return this.subjectsRepository.find({active: false});
  }

  async get(id: number) {
    const subject = await this.subjectsRepository.findOne(id);
    if(!subject) {
      throw new SubjectNotFoundException(id);
    }
    return subject;
  }

  async active(id: number) {
    const subject: SubjectEntity = await this.subjectsRepository.findOne({ id: id });
    subject.active = true;
    return this.subjectsRepository.save(subject);
  }

  async delete(id: number){
    return await this.subjectsRepository.delete(id);
  }
}
