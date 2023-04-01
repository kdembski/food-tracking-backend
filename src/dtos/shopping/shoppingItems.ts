export type ShoppingItemDTO = {
  id?: number;
  shoppingListId?: number;
  recipeId?: number;
  ingredientUnitId?: number;
  ingredientId?: number;
  customItemId?: number;
  amount?: number;
  isChecked?: boolean;
  checkedAt?: Date;
  isRemoved?: boolean;
  ingredientName?: string;
  unitShortcut?: string;
  customItemName?: string;
  ingredientCategoryId?: number;
  isPrimary?: boolean;
  converterToPrimary?: number;
};

export type ShoppingItemQueryResult = {
  id?: number;
  shoppingListId?: number;
  recipeId?: number;
  ingredientUnitId?: number;
  ingredientId?: number;
  customItemId?: number;
  amount?: string;
  isChecked?: number;
  checkedAt?: Date;
  isRemoved?: number;
  ingredientName?: string;
  unitShortcut?: string;
  customItemName?: string;
  ingredientCategoryId?: number;
  isPrimary?: number;
  converterToPrimary?: string;
};
