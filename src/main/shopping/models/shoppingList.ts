import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";
import { IShoppingList } from "@/interfaces/shopping/shopping-items/shoppingItem";

export class ShoppingList implements IShoppingList {
  private _id?: number;
  private _name?: string;
  private _count?: number;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get count() {
    return this._count;
  }

  set id(value) {
    this._id = value;
  }

  set name(value) {
    this._name = value;
  }

  set count(value) {
    this._count = value;
  }

  constructor(dto: ShoppingListDTO) {
    this._id = dto.id;
    this._name = dto.name;
    this._count = dto.count;
  }
}
