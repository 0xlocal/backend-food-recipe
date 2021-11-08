import { StepIngredients } from 'src/recipes/steps/entity/step-ingredients.entity';
import { IngredientCategory } from '../../ingredient-categories/entity/ingredient-category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ingredient')
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 45 })
  name: string;

  @Column()
  color: number;

  @Column('varchar', { length: 45 })
  img: string;

  @OneToMany(() => StepIngredients, (stepIngredients) => stepIngredients.recipe)
  stepIngredients: StepIngredients[];

  @ManyToMany(
    () => IngredientCategory,
    (ingredientCategory) => ingredientCategory.ingredients,
  )
  @JoinTable({
    name: 'ingredient_category_ingredient',
    joinColumn: {
      name: 'ingredient_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ingredient_category_id',
      referencedColumnName: 'id',
    },
  })
  ingredientCategories: IngredientCategory[];
}
