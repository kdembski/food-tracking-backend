import { IngredientUnitsCollectionValidator } from "./ingredientUnitsCollection";
import { Ingredient } from "./../models/ingredient";
import { Validator } from "@/base/validators/validator";
import { IngredientErrors } from "../models/errors/ingredient";

export class IngredientValidator extends Validator {
  private _errors?: IngredientErrors;

  get errors() {
    return this._errors;
  }

  override throwErrors() {
    super.throwErrors(this.errors);
  }

  validate(model: Ingredient) {
    this._errors = new IngredientErrors({
      name: this.getNameError(model.name),
      categoryId: this.getCategoryIdError(model.categoryId),
      units: new IngredientUnitsCollectionValidator().validate(model.units)
        .errors,
    });

    return this;
  }

  getNameError(name?: string) {
    if (!name) {
      return this.getRequiredFieldError();
    }

    return;
  }

  getCategoryIdError(categoryId?: number) {
    if (!categoryId) {
      return this.getRequiredFieldError();
    }

    return;
  }
}
