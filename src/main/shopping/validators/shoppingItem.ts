import { Validator } from "@/base/validators/validator";
import { ShoppingItemErrors } from "../models/errors/shoppingItem";
import { ShoppingItem } from "../models/shoppingItem";

export class ShoppingItemValidator extends Validator {
  private _errors?: ShoppingItemErrors;

  get errors() {
    return this._errors;
  }

  override throwErrors() {
    super.throwErrors(this.errors);
  }

  validate(model: ShoppingItem) {
    this._errors = new ShoppingItemErrors({
      shoppingListId: this.getNameError(model.shoppingListId),
      ingredientUnitId: this.getIngredientUnitIdError(model),
      customItemId: this.getCustomItemIdError(model),
    });

    return this;
  }

  getNameError(shoppingListId?: number) {
    if (!shoppingListId) {
      return this.getRequiredFieldError();
    }

    return;
  }

  getIngredientUnitIdError(model: ShoppingItem) {
    if (!model.ingredientUnitId && !model.customItemId) {
      return this.getRequiredFieldError();
    }

    return;
  }

  getCustomItemIdError(model: ShoppingItem) {
    if (!model.ingredientUnitId && !model.customItemId) {
      return this.getRequiredFieldError();
    }

    return;
  }
}
