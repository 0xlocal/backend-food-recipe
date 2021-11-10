import { IngredientCategory } from '../entity/ingredient-category.entity';

export class IngredientCategoryDTO {
  id?: number;
  parentId?: number;
  name: string;
  description?: string;

  public static fromEntity(categoryData: IngredientCategory) {
    const category = new IngredientCategoryDTO();
    category.id = categoryData.id;
    category.name = categoryData.name;
    category.parentId = categoryData.parentId;
    category.description = categoryData.description;

    return category;
  }
}
