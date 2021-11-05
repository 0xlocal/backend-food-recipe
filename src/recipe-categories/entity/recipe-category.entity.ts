import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe } from '../../recipes/entity/recipe.entity';

@Entity('recipe_category')
export class RecipeCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RecipeCategory, (recipeCategory) => recipeCategory.children)
  @JoinColumn({ name: 'parent_id' })
  parent: RecipeCategory;

  @Column({ name: 'parent_id' })
  parentId: number;

  @OneToMany(() => RecipeCategory, (recipeCategory) => recipeCategory.parent)
  children: RecipeCategory[];

  @Column('varchar', { length: 45 })
  name: string;

  @ManyToMany(() => Recipe, (recipe) => recipe.recipeCategories)
  recipes: Recipe[];
}
