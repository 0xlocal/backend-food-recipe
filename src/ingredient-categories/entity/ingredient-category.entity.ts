import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from '../../ingredients/entity/ingredient.entity';

@Entity('ingredient_category')
export class IngredientCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'parent_id', nullable: true })
  parentId: number;

  @ManyToOne(
    () => IngredientCategory,
    (ingredientCategory) => ingredientCategory.children,
  )
  @JoinColumn({ name: 'parent_id' })
  parent: IngredientCategory;

  @OneToMany(
    () => IngredientCategory,
    (ingredientCategory) => ingredientCategory.parent,
  )
  children: IngredientCategory[];

  @Column('varchar', { length: 255 })
  name: string;

  @Column('text')
  description: string;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.ingredientCategories)
  ingredients: Ingredient[];
}
