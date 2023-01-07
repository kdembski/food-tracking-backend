import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { IngredientCategory } from "@/main/ingredients/models/ingredientCategory";
import { IDbEntityController, IRepository } from "../base/dbEntity";

export interface IIngredientCategory {}

export interface IIngredientCategoriesRepository
  extends IRepository<IngredientCategory, IngredientCategoryDTO> {
  selectAll: () => Promise<IngredientCategoryDTO[]>;
}

export interface IIngredientCategoriesController
  extends IDbEntityController<IngredientCategory, IngredientCategoryDTO> {
  getAll: () => Promise<IngredientCategory[]>;
}
