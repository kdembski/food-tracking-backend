import { ExtendedRecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { IDbEntityController, IRepository } from "../base/dbEntity";

export interface IRecipeIngredient {}

export interface IRecipeIngredientsRepository
  extends IRepository<RecipeIngredient, ExtendedRecipeIngredientDTO> {
  selectByRecipeId: (
    recipeId: number
  ) => Promise<ExtendedRecipeIngredientDTO[]>;
}

export interface IRecipeIngredientsController
  extends IDbEntityController<RecipeIngredient> {}
