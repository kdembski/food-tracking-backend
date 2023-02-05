import { IngredientUnit } from "../models/ingredientUnit";
import { Validator } from "@/base/validators/validator";
import { IngredientUnitErrors } from "../models/errors/ingredientUnit";

export class IngredientUnitValidator extends Validator {
  private _errors?: IngredientUnitErrors;

  get errors() {
    return this._errors;
  }

  validate(model: IngredientUnit) {
    this._errors = new IngredientUnitErrors({
      unitId: this.getUnitIdError(model.unitId),
      kcalPerUnit: this.getKcalPerUnitError(model.kcalPerUnit),
      converterToPrimary: this.getConverterToPrimaryError(model),
    });

    return this;
  }

  getUnitIdError(unitId?: number) {
    if (!unitId) {
      return this.getRequiredFieldError();
    }

    return;
  }

  getKcalPerUnitError(kcalPerUnit?: number) {
    if (!kcalPerUnit) {
      return this.getRequiredFieldError();
    }

    return;
  }

  getConverterToPrimaryError(model: IngredientUnit) {
    if (!model.converterToPrimary && !model.isPrimary) {
      return this.getRequiredFieldError();
    }

    return;
  }
}
