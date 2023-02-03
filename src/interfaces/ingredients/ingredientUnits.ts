import { IngredientUnitQueryResult } from "@/dtos/ingredients/ingredientUnit";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";
import { IDbEntityController, IRepository } from "../base/dbEntity";

export interface IIngredientUnit {}

export interface IIngredientUnitsRepository
  extends IRepository<IngredientUnit, IngredientUnitQueryResult> {
  selectByIngredientId: (
    ingredientId: number
  ) => Promise<IngredientUnitQueryResult[]>;
}

export interface IIngredientUnitsController
  extends IDbEntityController<IngredientUnit> {}
