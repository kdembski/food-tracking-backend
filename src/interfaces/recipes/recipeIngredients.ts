import { RecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "../base/dbEntity";

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
