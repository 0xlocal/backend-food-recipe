import { StepIngredients } from '../entity/step-ingredients.entity';
import { Step } from '../entity/step.entity';

export class StepDTO {
  id?: number;
  recipeId: number;
  ingredientId: number;
  description: string;
  timer: number;
  image: string;
  amount: number;
  unit: string;

  public static fromEntity(step: Step, stepIngredients: StepIngredients) {
    const stepDto = new StepDTO();
    stepDto.id = step.id;
    stepDto.recipeId = step.recipeId;
    stepDto.ingredientId = stepIngredients.ingredientId;
    stepDto.description = step.description;
    stepDto.timer = step.timer;
    stepDto.image = step.image;
    stepDto.amount = stepIngredients.amount;
    stepDto.unit = stepIngredients.unit;

    return stepDto;
  }
}
