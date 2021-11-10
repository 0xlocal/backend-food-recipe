import { StepIngredients } from 'src/steps/entity/step-ingredients.entity';
import { IngredientCategory } from '../../ingredient-categories/entity/ingredient-category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('ingredient')
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 45 })
  name: string;

  @Column('int', { name: 'color' })
  color: number;

  @Column('varchar', { length: 45, nullable: true })
  img: string;

  @RelationId((ingredient: Ingredient) => ingredient.ingredientCategories)
  ingredientCategoryIds: number[];

  @ManyToMany(
    () => IngredientCategory,
    (ingredientCategory) => ingredientCategory.ingredients,
    { cascade: true },
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

  @OneToMany(() => StepIngredients, (stepIngredients) => stepIngredients.recipe)
  stepIngredients: StepIngredients[];
}
