import { ShoppingItem } from "./shoppingItem";

export class ShoppingItemsCollection {
  private _items?: ShoppingItem[];

  constructor(items: ShoppingItem[]) {
    this._items = items;
  }

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = value;
  }
}
