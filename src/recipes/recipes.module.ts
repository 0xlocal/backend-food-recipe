import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entity/recipe.entity';
import { RecipeCategory } from '../recipe-categories/entity/recipe-category.entity';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeCategory])],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
