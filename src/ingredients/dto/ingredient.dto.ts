import { Ingredient } from '../entity/ingredient.entity';

export class IngredientDTO {
  id?: number;
  name: string;
  color: number;
  img?: string;
  ingredientCategoryIds?: number[];

  public static fromEntity(ingredientData: Ingredient) {
    const ingredient = new IngredientDTO();
    ingredient.id = ingredientData.id;
    ingredient.name = ingredientData.name;
    ingredient.color = ingredientData.color;
    ingredient.img = ingredientData.img;
    ingredient.ingredientCategoryIds = ingredientData.ingredientCategoryIds;

    return Ingredient;
  }
}
