import { Validator } from "@/_shared/errors/validator";
import { RecipeIngredientsCollection } from "../collections/recipeIngredients";
import { RecipeIngredientErrors } from "../models/errors/recipeIngredient";
import { RecipeIngredientsCollectionErrors } from "../models/errors/recipeIngredientsCollection";
import { RecipeIngredientValidator } from "./recipeIngredient";

export class RecipeIngredientsCollectionValidator extends Validator<RecipeIngredientsCollection> {
  private _errors?: RecipeIngredientsCollectionErrors;

  get errors() {
    return this._errors;
  }

  override throwErrors() {
    super.throwErrors(this.errors);
  }

  validate(collection?: RecipeIngredientsCollection) {
    const errors = collection?.items.reduce(
      (accum: RecipeIngredientErrors[], unit) => {
        const ingredientErrors = new RecipeIngredientValidator().validate(
          unit
        ).errors;

        if (ingredientErrors) {
          accum.push(ingredientErrors);
          return accum;
        }

        return accum;
      },
      []
    );

    this._errors = new RecipeIngredientsCollectionErrors(errors);

    return this;
  }
}
