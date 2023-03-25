export type ShoppingItemDTO = {
  id: number;
  shoppingListId: number;
  recipeId: number;
  ingredientUnitId: number;
  customItemId: number;
  amount: number;
  isChecked: boolean;
  checkedAt: Date;
  isRemoved: boolean;
  ingredientName: string;
  unitShortcut: string;
};
