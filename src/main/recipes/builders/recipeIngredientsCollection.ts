import { RecipeIngredientsCollection } from "../collections/recipeIngredients";
import { RecipeIngredient } from "../models/recipeIngredient";

export class RecipeIngredientsCollectionBuilder {
  _collection: RecipeIngredientsCollection;

  constructor() {
    this._collection = new RecipeIngredientsCollection([]);
  }

  calculateKcal() {
    this.collection.kcal = this.collection.items.reduce(
      (accum: number, item: RecipeIngredient) => {
        if (!item.amount || !item.kcalPerUnit) {
          return accum;
        }

        accum += item.amount * item.kcalPerUnit;
        return accum;
      },
      0
    );
  }

  get collection() {
    return this._collection;
  }

  set collection(value) {
    this._collection = value;
  }
}
