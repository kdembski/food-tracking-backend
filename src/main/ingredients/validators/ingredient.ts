import { IngredientUnitsCollectionValidator } from "./ingredientUnitsCollection";
import { Ingredient } from "./../models/ingredient";
import { IngredientErrors } from "../models/errors/ingredient";
import { Validator } from "@/_shared/errors/validator";

export class IngredientValidator extends Validator<Ingredient> {
  private _errors?: IngredientErrors;
  private collectionValidator: IngredientUnitsCollectionValidator;

  constructor(collectionValidator = new IngredientUnitsCollectionValidator()) {
    super();
    this.collectionValidator = collectionValidator;
  }

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
      units: this.collectionValidator.validate(model.units).errors,
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
