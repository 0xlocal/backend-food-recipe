import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entity/recipe.entity';
import { RecipeDTO } from './dto/recipe.dto';
import { RecipeCategory } from '../recipe-categories/entity/recipe-category.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository(RecipeCategory)
    private recipeCategoryRepository: Repository<RecipeCategory>,
  ) {}

  async list() {
    return (await this.recipeRepository.find()) as RecipeDTO[];
  }

  async getOne(id: number) {
    const recipe = await this.recipeRepository.findOne(id);

    if (recipe) {
      return recipe as RecipeDTO;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: `Recipe with id ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async create(recipe: RecipeDTO) {
    try {
      const newRecipe = this.recipeRepository.create(recipe);

      const recipeCategories = await this.recipeCategoryRepository.findByIds(
        recipe.recipeCategoryIds,
      );

      if (recipeCategories) {
        newRecipe.recipeCategories = recipeCategories;
      }

      await this.recipeRepository.save(newRecipe);

      return newRecipe as RecipeDTO;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, recipeData: RecipeDTO) {
    const recipeCategories = await this.recipeCategoryRepository.findByIds(
      recipeData.recipeCategoryIds,
    );

    const recipe = { ...recipeData, recipeCategories: recipeCategories };

    // * changing to save because update method cannot save many-to-many relations
    await this.recipeRepository.save(recipe);
    const updateRecipe = await this.recipeRepository.findOne(id);

    if (updateRecipe) {
      return updateRecipe as RecipeDTO;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: `Recipe with ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async delete(id: number) {
    const deleteRecipe = await this.recipeRepository.delete(id);

    if (!deleteRecipe.affected) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `Recipe with ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
