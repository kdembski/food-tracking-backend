import { RecipeIngredient } from "../models/recipeIngredient";

export class RecipeIngredientsCollection {
  private _items: RecipeIngredient[];
  private _kcal?: number;

  constructor(items: RecipeIngredient[]) {
    this._items = items;
  }

  get items() {
    return this._items;
  }

  get kcal() {
    return this._kcal || 0;
  }

  set items(value) {
    this._items = value;
  }

  set kcal(value) {
    this._kcal = value;
  }
}
