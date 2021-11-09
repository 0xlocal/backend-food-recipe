import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { RecipeCategoriesModule } from './recipe-categories/recipe-categories.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { IngredientCategoriesModule } from './ingredient-categories/ingredient-categories.module';
import { RouterModule } from '@nestjs/core';
import routes from './routes';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule.register(routes),
    DatabaseModule,
    UsersModule,
    RecipesModule,
    RecipeCategoriesModule,
    IngredientsModule,
    IngredientCategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
