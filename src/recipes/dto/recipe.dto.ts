export class RecipeDTO {
  id?: number;
  name: string;
  description?: string;
  authorId: number;
  recipeCategoryIds?: number[];
}
