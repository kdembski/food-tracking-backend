import { ShoppingCustomItemDTO } from "@/dtos/shopping/shoppingCustomItems";

export class ShoppingCustomItem {
  private _id?: number;
  private _name?: string;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set id(value) {
    this._id = value;
  }

  set name(value) {
    this._name = value;
  }

  constructor(dto: ShoppingCustomItemDTO) {
    this._id = dto.id;
    this._name = dto.name;
  }
}
