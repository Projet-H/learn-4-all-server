import { Injectable} from '@nestjs/common';
import { DegreeDto } from './degree.dto';
import { DegreeEntity } from '../entities/degree.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DegreeService {

  constructor(
    @InjectRepository(DegreeEntity)
    private degreesRepository: Repository<DegreeEntity>,
  ){}

  create(degreeDto: DegreeDto) : Promise<DegreeEntity> {
    const degree = new DegreeEntity();
    Object.assign(degree, degreeDto);
    return this.degreesRepository.save(degree);
  }

  getAll(active: boolean){
    return this.degreesRepository.find({active: active});
  }

  getOne(slug: string) {
    return this.degreesRepository.findOne({slug: slug}, {relations: ['subjects']});
  }

  async active(id: number) {
    const degree: DegreeEntity = await this.degreesRepository.findOne({ id: id });
    degree.active = true;
    return this.degreesRepository.save(degree);
  }

  remove(id: number) {
    return this.degreesRepository.delete(id);
  }
}
