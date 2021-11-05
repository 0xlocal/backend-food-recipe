import { Test, TestingModule } from '@nestjs/testing';
import { RecipeCategoriesController } from './recipe-categories.controller';

describe('RecipeCategoriesController', () => {
  let controller: RecipeCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeCategoriesController],
    }).compile();

    controller = module.get<RecipeCategoriesController>(RecipeCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
