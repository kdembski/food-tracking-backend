import { IListController } from "./../base/controllers/list";
import { IngredientsList } from "@/models/ingredients/ingredientsList";
import { IListRepository } from "../base/repositories/list";
import { IRepository } from "../base/repositories/repository";
import { IModel } from "../base/models/model";
import { Ingredient } from "@/models/ingredients/ingredient";
import { IController } from "../base/controllers/controller";

export type IngredientDTO = {
  id?: number;
  name?: string;
  categoryId?: number;
};

export interface IIngredient extends IModel<IngredientDTO> {}

export interface IIngredientsRepository
  extends IRepository<Ingredient, IngredientDTO>,
    IListRepository<IngredientDTO> {}

export interface IIngredientsController
  extends IController<Ingredient, IngredientDTO>,
    IListController<IngredientsList> {}
