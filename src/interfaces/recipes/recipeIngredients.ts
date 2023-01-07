import { RecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { IDbEntityController, IRepository } from "../base/dbEntity";

export interface IRecipeIngredient {}

export interface IRecipeIngredientsRepository
  extends IRepository<RecipeIngredient, RecipeIngredientDTO> {
  selectByRecipeId: (recipeId: number) => Promise<RecipeIngredientDTO[]>;
}

export interface IRecipeIngredientsController
  extends IDbEntityController<RecipeIngredient, RecipeIngredientDTO> {
  getByRecipeId: (recipeId: number) => Promise<RecipeIngredient[]>;
}
