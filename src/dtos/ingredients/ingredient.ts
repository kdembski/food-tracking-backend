import { IngredientUnitsCollection } from "@/main/ingredients/collections/ingredientUnits";
import { IngredientUnitDTO } from "./ingredientUnit";

type IngredientBase = {
  id?: number;
  name?: string;
  categoryId?: number;
};

export type IngredientDTO = IngredientBase & {
  units?: IngredientUnitDTO[];
};

export type IngredientListItemDTO = IngredientBase & {
  categoryName?: string;
  unitNames?: string[];
};

export type IngredientOptionDTO = {
  id: number;
  name: string;
};

export type IngredientPayload = IngredientBase & {
  categoryName?: string;
  units?: IngredientUnitsCollection;
};

export type IngredientQueryResult = Required<IngredientBase> & {
  categoryName: string;
};
