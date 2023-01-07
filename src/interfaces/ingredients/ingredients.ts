import { IListRepository } from "../base/list";
import { Ingredient } from "@/main/ingredients/models/ingredient";
import { IDbEntityController, IRepository } from "../base/dbEntity";
import {
  IngredientDTO,
  IngredientOptionDTO,
} from "@/dtos/ingredients/ingredient";

export interface IIngredient {
  loadUnitNames: () => void;
}

export interface IIngredientsRepository
  extends IRepository<Ingredient, IngredientDTO>,
    IListRepository<IngredientDTO> {
  selectOptions: () => Promise<IngredientOptionDTO[]>;
}

export interface IIngredientsController
  extends IDbEntityController<Ingredient, IngredientDTO> {
  getOptions: () => Promise<IngredientOptionDTO[]>;
}
