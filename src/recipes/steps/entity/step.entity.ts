import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StepIngredients } from './step-ingredients.entity';
import { Recipe } from '../../entity/recipe.entity';

@Entity('step')
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.steps)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @Column({ name: 'recipe_id' })
  recipeId: number;

  @Column({ name: 'step_number' })
  stepNumber: number;

  @Column('text')
  description: string;

  @Column()
  timer: number;

  @Column('varchar', { length: 100 })
  image: string;

  @OneToMany(() => StepIngredients, (stepIngredients) => stepIngredients.recipe)
  stepIngredients: StepIngredients[];
}
