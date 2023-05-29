import { Validator } from "@/_shared/errors/validator";
import { IngredientCategoryErrors } from "../models/errors/ingredientCategory";
import { IngredientCategory } from "../models/ingredientCategory";

export class IngredientCategoryValidator extends Validator<IngredientCategory> {
  private _errors?: IngredientCategoryErrors;

  get errors() {
    return this._errors;
  }

  override throwErrors() {
    super.throwErrors(this.errors);
  }

  validate(model: IngredientCategory) {
    this._errors = new IngredientCategoryErrors({
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
