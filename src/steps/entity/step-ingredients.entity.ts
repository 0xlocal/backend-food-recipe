import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Recipe } from '../../recipes/entity/recipe.entity';
import { Ingredient } from '../../ingredients/entity/ingredient.entity';
import { Step } from './step.entity';

@Entity('step_ingredients')
export class StepIngredients {
  @PrimaryColumn({ name: 'recipe_id' })
  recipeId: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.stepIngredients)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @PrimaryColumn({ name: 'step_id' })
  stepId: number;

  @ManyToOne(() => Step, (step) => step.stepIngredients)
  @JoinColumn({ name: 'step_id' })
  step: Step;

  @Column({ name: 'ingredient_id' })
  ingredientId: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.stepIngredients)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @Column({ nullable: true })
  amount: number;

  @Column('varchar', { length: 25, nullable: true })
  unit: string;
}
