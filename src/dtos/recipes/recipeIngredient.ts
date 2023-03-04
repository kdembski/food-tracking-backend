export type RecipeIngredientBase = {
  id?: number;
  recipeId?: number;
  ingredientUnitId?: number;
  ingredientId?: number;
  unitId?: number;
  amount?: number;
};

export type RecipeIngredientDTO = RecipeIngredientBase;

export type ExtendedRecipeIngredientDTO = RecipeIngredientBase & {
  ingredientName?: string;
  unitShortcut?: string;
  kcalPerUnit?: number;
  isPrimary?: boolean;
  converterToPrimary?: number;
};
