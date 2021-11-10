import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StepIngredients } from './step-ingredients.entity';
import { Recipe } from '../../recipes/entity/recipe.entity';

@Entity('step')
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'recipe_id' })
  recipeId: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.steps)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @Column({ name: 'step_number' })
  stepNumber: number;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  timer: number;

  @Column('varchar', { length: 100, nullable: true })
  image: string;

  @OneToMany(() => StepIngredients, (stepIngredients) => stepIngredients.recipe)
  stepIngredients: StepIngredients[];
}
