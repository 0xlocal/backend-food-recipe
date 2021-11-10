import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeCategory } from './entity/recipe-category.entity';
import { RecipeCategoryDTO } from './dto/recipe-category.dto';

@Injectable()
export class RecipeCategoriesService {
  constructor(
    @InjectRepository(RecipeCategory)
    private recipeCategoryRepository: Repository<RecipeCategory>,
  ) {}

  async list() {
    return (await this.recipeCategoryRepository.find()) as RecipeCategoryDTO[];
  }

  async getOne(id: number) {
    const recipeCategory = await this.recipeCategoryRepository.findOne(id);

    if (recipeCategory) {
      return recipeCategory as RecipeCategoryDTO;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: `Recipe Category with id ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async create(recipeCategory: RecipeCategoryDTO) {
    try {
      const newRecipeCategory =
        this.recipeCategoryRepository.create(recipeCategory);
      await this.recipeCategoryRepository.save(newRecipeCategory);

      return newRecipeCategory as RecipeCategoryDTO;
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

  async update(id: number, recipeCategory: RecipeCategoryDTO) {
    await this.recipeCategoryRepository.update(id, recipeCategory);
    const updateRecipeCategory = await this.recipeCategoryRepository.findOne(
      id,
    );

    if (updateRecipeCategory) {
      return updateRecipeCategory as RecipeCategoryDTO;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: `Recipe Category with ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async delete(id: number) {
    const deleteRecipeCategory = await this.recipeCategoryRepository.delete(id);

    if (!deleteRecipeCategory.affected) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `Recipe Category with ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
