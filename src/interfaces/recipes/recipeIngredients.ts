import { RecipeIngredientQueryResult } from "@/dtos/recipes/recipeIngredient";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { IDbEntityController, IRepository } from "../base/dbEntity";

export interface IRecipeIngredient {}

export interface IRecipeIngredientsRepository
  extends IRepository<RecipeIngredient, RecipeIngredientQueryResult> {
  selectByRecipeId: (
    recipeId: number
  ) => Promise<RecipeIngredientQueryResult[]>;
}

export interface IRecipeIngredientsController
  extends IDbEntityController<RecipeIngredient> {}
