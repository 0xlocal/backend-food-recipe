import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IngredientCategoryDTO } from './dto/ingredient-category.dto';
import { IngredientCategoriesService } from './ingredient-categories.service';

@Controller()
export class IngredientCategoriesController {
  constructor(
    private readonly ingredientCategoriesService: IngredientCategoriesService,
  ) {}

  @Get()
  async getCategories() {
    return await this.ingredientCategoriesService.list();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.ingredientCategoriesService.getOne(id);
  }

  @Post()
  async createUser(@Body() ingredientCategories: IngredientCategoryDTO) {
    return this.ingredientCategoriesService.create(ingredientCategories);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() ingredientCategories: IngredientCategoryDTO,
  ) {
    return this.ingredientCategoriesService.update(id, ingredientCategories);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    this.ingredientCategoriesService.delete(id);
  }
}
