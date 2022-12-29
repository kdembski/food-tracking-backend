import { IngredientCategory } from "@/main/ingredients/models/ingredientCategory";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "../base/dbEntity";

export type IngredientCategoryDTO = {
  id?: number;
  name?: string;
};

export interface IIngredientCategory
  extends IDbEntityModel<IngredientCategoryDTO> {}

export interface IIngredientCategoriesRepository
  extends IRepository<IngredientCategory, IngredientCategoryDTO> {
  selectAll: () => Promise<IngredientCategoryDTO[]>;
}

export interface IIngredientCategoriesController
  extends IDbEntityController<IngredientCategory, IngredientCategoryDTO> {
  getAll: () => Promise<IngredientCategory[]>;
}
