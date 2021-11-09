import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecipeCategoriesService } from './recipe-categories.service';
import { RecipeCategoryDTO } from './dto/recipe-category.dto';

@Controller()
export class RecipeCategoriesController {
  constructor(
    private readonly recipeCategoriesService: RecipeCategoriesService,
  ) {}

  @Get()
  async getCategories() {
    return await this.recipeCategoriesService.list();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.recipeCategoriesService.getOne(id);
  }

  @Post()
  async createUser(@Body() recipeCategories: RecipeCategoryDTO) {
    return this.recipeCategoriesService.create(recipeCategories);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() recipeCategories: RecipeCategoryDTO,
  ) {
    return this.recipeCategoriesService.update(id, recipeCategories);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    this.recipeCategoriesService.delete(id);
  }
}
