import { IngredientUnitsCollection } from "@/main/ingredients/collections/ingredientUnits";
import { IngredientUnitDTO } from "./ingredientUnit";

export type IngredientDTO = {
  id?: number;
  name?: string;
  categoryId?: number;
  units?: IngredientUnitDTO[];
};

export type IngredientListItemDTO = {
  id?: number;
  name?: string;
  categoryId?: number;
  categoryName?: string;
  unitNames?: string[];
};

export type IngredientOptionDTO = {
  id: number;
  name: string;
};

export type IngredientPayload = {
  id?: number;
  name?: string;
  categoryId?: number;
  categoryName?: string;
  units?: IngredientUnitsCollection;
};

export type IngredientQueryResult = {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
};
