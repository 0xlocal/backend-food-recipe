import { Recipe } from '../entity/recipe.entity';

export class RecipeDTO {
  id?: number;
  name: string;
  description?: string;
  authorId: number;
  recipeCategoryIds?: number[];

  public static fromEntity(recipeData: Recipe) {
    const recipe = new RecipeDTO();
    recipe.id = recipeData.id;
    recipe.name = recipeData.name;
    recipe.authorId = recipeData.authorId;
    recipe.description = recipeData.description;
    recipe.recipeCategoryIds = recipeData.recipeCategoryIds;

    return recipe;
  }
}
