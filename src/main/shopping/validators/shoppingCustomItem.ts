import { Validator } from "@/base/validators/validator";
import { ShoppingCustomItemErrors } from "../models/errors/shoppingCustomItem";
import { ShoppingCustomItem } from "../models/shoppingCustomItem";

export class ShoppingCustomItemValidator extends Validator {
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
