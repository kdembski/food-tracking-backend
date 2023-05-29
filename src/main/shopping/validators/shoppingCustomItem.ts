import { Validator } from "@/_shared/errors/validator";
import { ShoppingCustomItemErrors } from "../models/errors/shoppingCustomItem";
import { ShoppingCustomItem } from "../models/shoppingCustomItem";

export class ShoppingCustomItemValidator extends Validator<ShoppingCustomItem> {
  private _errors?: ShoppingCustomItemErrors;

  get errors() {
    return this._errors;
  }

  override throwErrors() {
    super.throwErrors(this.errors);
  }

  validate(model: ShoppingCustomItem) {
    this._errors = new ShoppingCustomItemErrors({
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
