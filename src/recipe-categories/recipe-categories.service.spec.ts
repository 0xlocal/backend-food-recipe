import { Test, TestingModule } from '@nestjs/testing';
import { RecipeCategoriesService } from './recipe-categories.service';

describe('RecipeCategoriesService', () => {
  let service: RecipeCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeCategoriesService],
    }).compile();

    service = module.get<RecipeCategoriesService>(RecipeCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
