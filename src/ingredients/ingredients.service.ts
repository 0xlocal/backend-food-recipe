import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entity/ingredient.entity';
import { IngredientCategory } from '../ingredient-categories/entity/ingredient-category.entity';
import { IngredientDTO } from './dto/ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(IngredientCategory)
    private ingredientCategoryRepository: Repository<IngredientCategory>,
  ) {}

  async list() {
    return (await this.ingredientRepository.find()) as IngredientDTO[];
  }

  async getOne(id: number) {
    const ingredient = await this.ingredientRepository.findOne(id);

    if (ingredient) {
      return ingredient as IngredientDTO;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: `Recipe with id ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async create(ingredient: IngredientDTO) {
    try {
      const newIngredient = this.ingredientRepository.create(ingredient);

      const ingredientCategories =
        await this.ingredientCategoryRepository.findByIds(
          ingredient.ingredientCategoryIds,
        );

      if (ingredientCategories) {
        ingredientCategories.forEach((ingredientCategory) => {
          newIngredient.ingredientCategories.push(ingredientCategory);
        });
      }

      await this.ingredientRepository.save(newIngredient);

      return newIngredient as IngredientDTO;
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

  async update(id: number, ingredientData: IngredientDTO) {
    const ingredientCategories =
      await this.ingredientCategoryRepository.findByIds(
        ingredientData.ingredientCategoryIds,
      );

    const ingredient = {
      ...ingredientCategories,
      ingredientCategories: ingredientCategories,
    };
    await this.ingredientRepository.update(id, ingredient);
    const updateIngredient = await this.ingredientRepository.findOne(id);

    if (updateIngredient) {
      return updateIngredient as IngredientDTO;
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
    const deleteRecipe = await this.ingredientRepository.delete(id);

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
