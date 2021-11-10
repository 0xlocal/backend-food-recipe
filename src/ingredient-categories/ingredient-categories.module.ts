import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientCategory } from './entity/ingredient-category.entity';
import { IngredientCategoriesController } from './ingredient-categories.controller';
import { IngredientCategoriesService } from './ingredient-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientCategory])],
  controllers: [IngredientCategoriesController],
  providers: [IngredientCategoriesService],
})
export class IngredientCategoriesModule {}
