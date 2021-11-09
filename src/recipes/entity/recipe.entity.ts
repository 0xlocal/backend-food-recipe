import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../../users/entity/user.entity';
import { RecipeCategory } from '../../recipe-categories/entity/recipe-category.entity';
import { StepIngredients } from '../steps/entity/step-ingredients.entity';
import { Step } from '../steps/entity/step.entity';

@Entity('recipe')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (user) => user.recipes)
  @JoinColumn({ name: 'author_id' })
  user: User;

  @Column({ name: 'author_id' })
  authorId: number;

  @ManyToMany(() => RecipeCategory, (recipeCategory) => recipeCategory.recipes)
  @JoinTable({
    name: 'recipe_category_recipe',
    joinColumn: {
      name: 'recipe_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'recipe_category_id',
      referencedColumnName: 'id',
    },
  })
  recipeCategories: RecipeCategory[];

  @OneToMany(() => Step, (step) => step.recipe)
  steps: Step[];

  @OneToMany(() => StepIngredients, (stepIngredients) => stepIngredients.recipe)
  stepIngredients: StepIngredients[];
}