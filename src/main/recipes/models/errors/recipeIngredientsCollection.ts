import { IErrors } from "@/interfaces/base/errors";
import { RecipeIngredientErrors } from "./recipeIngredient";

export class RecipeIngredientsCollectionErrors implements IErrors {
  private _items?: RecipeIngredientErrors[];

  constructor(items?: RecipeIngredientErrors[]) {
    this._items = items;
  }
  get items() {
    return this._items;
  }

  isEmpty() {
    if (!this.items) {
      return true;
    }

    return this.items.every((item) => item.isEmpty());
  }
}
