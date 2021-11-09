import { Test, TestingModule } from '@nestjs/testing';
import { IngredientCategoriesController } from './ingredient-categories.controller';

describe('IngredientCategoriesController', () => {
  let controller: IngredientCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientCategoriesController],
    }).compile();

    controller = module.get<IngredientCategoriesController>(
      IngredientCategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
