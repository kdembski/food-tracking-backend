export type RecipeIngredientBase = {
  id?: number;
  recipeId?: number;
  ingredientUnitId?: number;
  amount?: number;
};

export type RecipeIngredientDTO = RecipeIngredientBase & {
  ingredientId?: number;
  unitId?: number;
  ingredientName?: string;
  unitShortcut?: string;
  kcalPerUnit?: number;
  isPrimary?: boolean;
  converterToPrimary?: number;
};

export type RecipeIngredientQueryResult = {
  id?: number;
  recipeId?: number;
  ingredientUnitId?: number;
  ingredientId?: number;
  unitId?: number;
  amount?: string;
  ingredientName?: string;
  unitShortcut?: string;
  kcalPerUnit?: string;
  isPrimary?: boolean;
  converterToPrimary?: string;
};
