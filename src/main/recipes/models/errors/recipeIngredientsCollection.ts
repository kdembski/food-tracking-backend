import { IErrors } from "@/interfaces/base/errors";
import { RecipeIngredientErrors } from "./recipeIngredient";

export class RecipeIngredientsCollectionErrors implements IErrors {
  private items?: RecipeIngredientErrors[];

  constructor(items?: RecipeIngredientErrors[]) {
    this.items = items;
  }

  isEmpty() {
    if (!this.items) {
      return true;
    }

    return this.items.every((item) => item.isEmpty());
  }
}
