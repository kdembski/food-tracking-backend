import { IListRepository } from "../base/list";
import { Ingredient } from "@/main/ingredients/models/ingredient";
import { IDbEntityController, IRepository } from "../base/dbEntity";
import {
  IngredientDTO,
  IngredientOptionDTO,
} from "@/dtos/ingredients/ingredient";
import { IngredientsListFilters } from "@/types/ingredients/ingredients";

export interface IIngredient {}

export interface IIngredientsRepository
  extends IRepository<Ingredient, IngredientDTO>,
    IListRepository<IngredientDTO, IngredientsListFilters> {
  selectOptions: () => Promise<IngredientOptionDTO[]>;
}

export interface IIngredientsController
  extends IDbEntityController<Ingredient> {
  getOptions: () => Promise<IngredientOptionDTO[]>;
}
