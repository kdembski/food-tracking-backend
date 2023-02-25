import { RecipeIngredient } from "../models/recipeIngredient";

export class RecipeIngredientsCollection {
  private _items: RecipeIngredient[];

  constructor(items: RecipeIngredient[]) {
    this._items = items;
  }

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = value;
  }
}
