type IngredientUnitBase = {
  id?: number;
  ingredientId?: number;
  unitId?: number;
  unitName?: string;
};

export type IngredientUnitDTO = IngredientUnitBase & {
  kcalPerUnit?: number;
  isPrimary?: boolean;
  converterToPrimary?: number;
};

export type IngredientUnitQueryResult = IngredientUnitBase & {
  kcalPerUnit?: string;
  isPrimary?: number;
  converterToPrimary?: string;
};
