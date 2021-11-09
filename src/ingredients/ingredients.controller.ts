import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IngredientDTO } from './dto/ingredient.dto';
import { IngredientsService } from './ingredients.service';

@Controller()
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  async getCategories() {
    return await this.ingredientsService.list();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.ingredientsService.getOne(id);
  }

  @Post()
  async createUser(@Body() ingredient: IngredientDTO) {
    return this.ingredientsService.create(ingredient);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() ingredient: IngredientDTO) {
    return this.ingredientsService.update(id, ingredient);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    this.ingredientsService.delete(id);
  }
}
