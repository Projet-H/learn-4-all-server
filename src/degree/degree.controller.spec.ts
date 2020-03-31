import { Test, TestingModule } from '@nestjs/testing';
import { DegreeController } from './degree.controller';

describe('Degree Controller', () => {
  let controller: DegreeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DegreeController],
    }).compile();

    controller = module.get<DegreeController>(DegreeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
