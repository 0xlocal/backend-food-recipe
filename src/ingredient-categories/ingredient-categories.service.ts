import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientCategoryDTO } from './dto/ingredient-category.dto';
import { IngredientCategory } from './entity/ingredient-category.entity';

@Injectable()
export class IngredientCategoriesService {
  constructor(
    @InjectRepository(IngredientCategory)
    private ingredientCategoryRepository: Repository<IngredientCategory>,
  ) {}

  async list() {
    return await this.ingredientCategoryRepository
      .find()
      .then((items) => items.map((e) => IngredientCategoryDTO.fromEntity(e)));
  }

  async getOne(id: number) {
    const ingredientCategory = await this.ingredientCategoryRepository.findOne(
      id,
    );

    if (ingredientCategory) {
      return IngredientCategoryDTO.fromEntity(ingredientCategory);
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: `Ingredient Category with id ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async create(ingredientCategory: IngredientCategoryDTO) {
    try {
      const newIngredientCategory =
        this.ingredientCategoryRepository.create(ingredientCategory);
      await this.ingredientCategoryRepository.save(newIngredientCategory);

      return IngredientCategoryDTO.fromEntity(newIngredientCategory);
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

  async update(id: number, ingredientCategory: IngredientCategoryDTO) {
    await this.ingredientCategoryRepository.update(id, ingredientCategory);
    const updateIngredientCategory =
      await this.ingredientCategoryRepository.findOne(id);

    if (updateIngredientCategory) {
      return IngredientCategoryDTO.fromEntity(updateIngredientCategory);
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: `Ingredient Category with ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async delete(id: number) {
    const deleteIngredientCategory =
      await this.ingredientCategoryRepository.delete(id);

    if (!deleteIngredientCategory.affected) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `Ingredient Category with ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
