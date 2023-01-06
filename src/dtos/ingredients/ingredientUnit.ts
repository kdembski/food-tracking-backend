export type IngredientUnitDTO = {
  id?: number;
  ingredientId?: number;
  unitId?: number;
  unitName?: string;
  kcalPerUnit?: number;
  isPrimary?: boolean;
  converterToPrimary?: number;
};
