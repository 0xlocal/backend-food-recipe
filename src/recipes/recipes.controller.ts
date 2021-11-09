import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeDTO } from './dto/recipe.dto';

@Controller()
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getCategories() {
    return await this.recipesService.list();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.recipesService.getOne(id);
  }

  @Post()
  async createUser(@Body() recipe: RecipeDTO) {
    return this.recipesService.create(recipe);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() recipe: RecipeDTO) {
    return this.recipesService.update(id, recipe);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    this.recipesService.delete(id);
  }
}
