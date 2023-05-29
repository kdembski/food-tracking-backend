import { Validator } from "@/_shared/errors/validator";
import { RecipeErrors } from "../models/errors/recipe";
import { Recipe } from "../models/recipe";

export class RecipeValidator extends Validator<Recipe> {
  private _errors?: RecipeErrors;

  get errors() {
    return this._errors;
  }

  override throwErrors() {
    super.throwErrors(this.errors);
  }

  validate(model: Recipe) {
    this._errors = new RecipeErrors({
      recipeName: this.getNameError(model.recipeName),
      preparationTime: this.getPreparationTimeError(model.preparationTime),
    });

    return this;
  }

  getNameError(name?: string) {
    if (!name) {
      return this.getRequiredFieldError();
    }

    return;
  }

  getPreparationTimeError(preparationTime?: number) {
    if (!preparationTime) {
      return this.getRequiredFieldError();
    }

    return;
  }
}
