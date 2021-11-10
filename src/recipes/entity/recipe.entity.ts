import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import User from '../../users/entity/user.entity';
import { RecipeCategory } from '../../recipe-categories/entity/recipe-category.entity';
import { StepIngredients } from '../../steps/entity/step-ingredients.entity';
import { Step } from '../../steps/entity/step.entity';
import { Exclude } from 'class-transformer';

@Entity('recipe')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column({ name: 'author_id' })
  authorId: number;

  @ManyToOne(() => User, (user) => user.recipes, { cascade: true })
  @JoinColumn({ name: 'author_id' })
  user: User;

  @RelationId((recipe: Recipe) => recipe.recipeCategories)
  recipeCategoryIds: number[];

  @Exclude({ toPlainOnly: true })
  @ManyToMany(
    () => RecipeCategory,
    (recipeCategory) => recipeCategory.recipes,
    { cascade: true },
  )
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
