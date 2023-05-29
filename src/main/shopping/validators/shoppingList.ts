import { Validator } from "@/_shared/errors/validator";
import { ShoppingListErrors } from "../models/errors/shoppingList";
import { ShoppingList } from "../models/shoppingList";

export class ShoppingListValidator extends Validator<ShoppingList> {
  private _errors?: ShoppingListErrors;

  get errors() {
    return this._errors;
  }

  override throwErrors() {
    super.throwErrors(this.errors);
  }

  validate(model: ShoppingList) {
    this._errors = new ShoppingListErrors({
      name: this.getNameError(model.name),
    });

    return this;
  }

  getNameError(name?: string) {
    if (!name) {
      return this.getRequiredFieldError();
    }

    return;
  }
}
