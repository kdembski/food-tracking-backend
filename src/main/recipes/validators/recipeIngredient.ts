import { Validator } from "@/_shared/errors/validator";
import { RecipeIngredientErrors } from "../models/errors/recipeIngredient";
import { RecipeIngredient } from "../models/recipeIngredient";

export class RecipeIngredientValidator extends Validator<RecipeIngredient> {
  private _errors?: RecipeIngredientErrors;

  get errors() {
    return this._errors;
  }

  validate(model: RecipeIngredient) {
    this._errors = new RecipeIngredientErrors({
      ingredientId: this.getIngredientIdError(model.ingredientId),
      unitId: this.getUnitIdError(model.unitId),
      amount: this.getAmountError(model.amount),
    });

    return this;
  }

  getIngredientIdError(ingredientId?: number) {
    if (!ingredientId) {
      return this.getRequiredFieldError();
    }

    return;
  }

  getUnitIdError(unitId?: number) {
    if (!unitId) {
      return this.getRequiredFieldError();
    }

    return;
  }

  getAmountError(amount?: number) {
    if (!amount) {
      return this.getRequiredFieldError();
    }

    return;
  }
}
