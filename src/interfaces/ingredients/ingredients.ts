import { IListController, IListRepository } from "../base/list";
import { Ingredient } from "@/main/ingredients/models/ingredient";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "../base/dbEntity";
import { IngredientsList } from "@/main/ingredients/models/ingredientsList";

export type IngredientDTO = {
  id?: number;
  name?: string;
  categoryId?: number;
  categoryName?: string;
  unitNames?: string[];
};

export interface IIngredient extends IDbEntityModel<IngredientDTO> {
  loadUnitNames: () => void;
}

export interface IIngredientsRepository
  extends IRepository<Ingredient, IngredientDTO>,
    IListRepository<IngredientDTO> {}

export interface IIngredientsController
  extends IDbEntityController<Ingredient, IngredientDTO>,
    IListController<IngredientsList> {}
