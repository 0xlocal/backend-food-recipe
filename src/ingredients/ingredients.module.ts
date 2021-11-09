import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientCategory } from 'src/ingredient-categories/entity/ingredient-category.entity';
import { Ingredient } from './entity/ingredient.entity';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, IngredientCategory])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
