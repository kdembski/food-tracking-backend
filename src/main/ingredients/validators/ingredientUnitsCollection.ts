import { Validator } from "@/_shared/errors/validator";
import { IngredientUnitsCollection } from "../collections/ingredientUnits";
import { IngredientUnitErrors } from "../models/errors/ingredientUnit";
import { IngredientUnitValidator } from "./ingredientUnit";

export class IngredientUnitsCollectionValidator extends Validator<IngredientUnitsCollection> {
  private _errors?: IngredientUnitErrors[];
  private validator: IngredientUnitValidator;

  constructor(validator = new IngredientUnitValidator()) {
    super();
    this.validator = validator;
  }

  get errors() {
    return this._errors;
  }

  validate(model?: IngredientUnitsCollection) {
    this._errors = model?.items.reduce(
      (accum: IngredientUnitErrors[], unit) => {
        const unitErrors = this.validator.validate(unit).errors;

        if (unitErrors) {
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
