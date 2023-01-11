import { IngredientUnitDTO } from "@/dtos/ingredients/ingredientUnit";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";
import { IDbEntityController, IRepository } from "../base/dbEntity";

export interface IIngredientUnit {}

export interface IIngredientUnitsRepository
  extends IRepository<IngredientUnit, IngredientUnitDTO> {
  selectByIngredientId: (ingredientId: number) => Promise<IngredientUnitDTO[]>;
}

export interface IIngredientUnitsController
  extends IDbEntityController<IngredientUnit> {}
