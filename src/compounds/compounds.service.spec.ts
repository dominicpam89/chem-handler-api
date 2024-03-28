import { Test, TestingModule } from '@nestjs/testing';
import { CompoundsService } from './compounds.service';

describe('CompoundsService', () => {
  let service: CompoundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompoundsService],
    }).compile();

    service = module.get<CompoundsService>(CompoundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
