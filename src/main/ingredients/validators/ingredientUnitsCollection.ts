import { Validator } from "@/base/validators/validator";
import { IngredientUnitsCollection } from "../collections/ingredientUnits";
import { IngredientUnitErrors } from "../models/errors/ingredientUnit";
import { IngredientUnitValidator } from "./ingredientUnit";

export class IngredientUnitsCollectionValidator extends Validator {
  private _errors?: IngredientUnitErrors[];

  get errors() {
    return this._errors;
  }

  validate(model?: IngredientUnitsCollection) {
    this._errors = model?.items.reduce(
      (accum: IngredientUnitErrors[], unit) => {
        const unitErrors = new IngredientUnitValidator().validate(unit).errors;

        if (unitErrors && !unitErrors.isEmpty()) {
          accum.push(unitErrors);
          return accum;
        }

        return accum;
      },
      []
    );

    return this;
  }
}
