import { IngredientsList } from "@/models/ingredients/ingredientsList";
import { IListController, IListRepository } from "../base/list";
import { Ingredient } from "@/models/ingredients/ingredient";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "../base/dbEntity";

export type IngredientDTO = {
  id?: number;
  name?: string;
  categoryId?: number;
};

export interface IIngredient extends IDbEntityModel<IngredientDTO> {}

export interface IIngredientsRepository
  extends IRepository<Ingredient, IngredientDTO>,
    IListRepository<IngredientDTO> {}

export interface IIngredientsController
  extends IDbEntityController<Ingredient, IngredientDTO>,
    IListController<IngredientsList> {}
