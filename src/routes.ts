import { Routes } from '@nestjs/core';
import { IngredientCategoriesModule } from './ingredient-categories/ingredient-categories.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipeCategoriesModule } from './recipe-categories/recipe-categories.module';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
import { StepsModule } from './steps/steps.module';

const routes: Routes = [
  { path: 'users', module: UsersModule },
  {
    path: 'ingredients',
    module: IngredientsModule,
    children: [{ path: 'categories', module: IngredientCategoriesModule }],
  },
  {
    path: 'recipes',
    module: RecipesModule,
    children: [
      { path: 'categories', module: RecipeCategoriesModule },
      { path: ':recipeId/steps', module: StepsModule },
    ],
  },
];

export default routes;
