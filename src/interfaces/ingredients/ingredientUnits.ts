import { IngredientUnitDTO } from "@/dtos/ingredients/ingredientUnit";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "../base/dbEntity";

export interface IIngredientUnit extends IDbEntityModel<IngredientUnitDTO> {}

export interface IIngredientUnitsRepository
  extends IRepository<IngredientUnit, IngredientUnitDTO> {
  selectByIngredientId: (ingredientId: number) => Promise<IngredientUnitDTO[]>;
}

export interface IIngredientUnitsController
  extends IDbEntityController<IngredientUnit, IngredientUnitDTO> {
  getByIngredientId: (ingredientId: number) => Promise<IngredientUnit[]>;
  getUnitNamesByIngredientId: (ingredientId: number) => Promise<string[]>;
}
