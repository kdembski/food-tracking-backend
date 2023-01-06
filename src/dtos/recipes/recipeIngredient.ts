export type RecipeIngredientDTO = {
  id?: number;
  recipeId?: number;
  ingredientUnitId?: number;
  amount?: number;
  ingredientName?: string;
  unitShortcut?: string;
  kcalPerUnit?: number;
  isPrimary?: boolean;
  converterToPrimary?: number;
};
