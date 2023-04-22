import { ShoppingList } from "./shoppingList";

export class ShoppingListCollection {
  private _items?: ShoppingList[];

  constructor(items: ShoppingList[]) {
    this._items = items;
  }

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = value;
  }
}
