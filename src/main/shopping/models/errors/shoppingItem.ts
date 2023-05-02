import { IErrors } from "@/interfaces/base/errors";
import { FieldError } from "@/types/base/errors";

export class ShoppingItemErrors implements IErrors {
  shoppingListId?: FieldError;
  ingredientUnitId?: FieldError;
  customItemId?: FieldError;

  constructor(data: {
    shoppingListId?: FieldError;
    ingredientUnitId?: FieldError;
    customItemId?: FieldError;
  }) {
    this.shoppingListId = data.shoppingListId;
    this.ingredientUnitId = data.ingredientUnitId;
    this.customItemId = data.customItemId;
  }

  isEmpty() {
    return !this.shoppingListId && !this.ingredientUnitId && !this.customItemId;
  }
}
