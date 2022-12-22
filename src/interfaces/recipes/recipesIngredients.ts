import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "../base/dbEntity";
import { RecipeIngredient } from "@/models/recipes/recipesIngredients";

export type RecipeIngredientDTO = {
  id?: number;
  recipeId?: number;
  ingredientUnitId?: number;
  amount?: number;
  ingredientName?: string;
  unitShortcut?: string;
  kcalPerUnit?: number;
  isPrimary?: boolean;
  converterToPrimary?: number;
};

export interface IRecipeIngredient
  extends IDbEntityModel<RecipeIngredientDTO> {}

export interface IRecipeIngredientsRepository
  extends IRepository<RecipeIngredient, RecipeIngredientDTO> {
  selectByRecipeId: (recipeId: number) => Promise<RecipeIngredientDTO[]>;
}

export interface IRecipeIngredientsController
  extends IDbEntityController<RecipeIngredient, RecipeIngredientDTO> {
  getByRecipeId: (recipeId: number) => Promise<RecipeIngredient[]>;
}
