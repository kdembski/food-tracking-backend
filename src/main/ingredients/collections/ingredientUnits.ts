import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";

export class IngredientUnitsCollection {
  private _items: IngredientUnit[];

  constructor(items: IngredientUnit[]) {
    this._items = items;
  }

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = value;
  }

  getUnitNames() {
    return this.items
      .map((item) => item.unitName)
      .filter((name): name is string => !!name);
  }
}
