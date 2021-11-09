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

  @Column({ name: 'parent_id', nullable: true })
  parentId: number;

  @ManyToOne(() => RecipeCategory, (recipeCategory) => recipeCategory.children)
  @JoinColumn({ name: 'parent_id' })
  parent: RecipeCategory;

  @OneToMany(() => RecipeCategory, (recipeCategory) => recipeCategory.parent)
  children: RecipeCategory[];

  @Column('varchar', { length: 45 })
  name: string;

  @ManyToMany(() => Recipe, (recipe) => recipe.recipeCategories)
  recipes: Recipe[];
}
