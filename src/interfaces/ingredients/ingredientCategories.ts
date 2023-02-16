import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { IngredientCategory } from "@/main/ingredients/models/ingredientCategory";
import { IDbEntityController, IRepository } from "../base/dbEntity";
import { IListRepository } from "../base/list";

export interface IIngredientCategory {}

export interface IIngredientCategoriesRepository
  extends IRepository<IngredientCategory, IngredientCategoryDTO>,
    IListRepository<IngredientCategoryDTO> {
  selectAll: () => Promise<IngredientCategoryDTO[]>;
}

export interface IIngredientCategoriesController
  extends IDbEntityController<IngredientCategory> {
  getAll: () => Promise<IngredientCategory[]>;
}
