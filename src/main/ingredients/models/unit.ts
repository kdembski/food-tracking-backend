import { UnitDTO } from "@/dtos/ingredients/unit";

export class Unit {
  private _id?: number;
  private _name?: string;
  private _shortcut?: string;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get shortcut() {
    return this._shortcut;
  }

  set id(value) {
    this._id = value;
  }

  set name(value) {
    this._name = value;
  }

  set shortcut(value) {
    this._shortcut = value;
  }

  constructor(dto: UnitDTO) {
    this._id = dto.id;
    this._name = dto.name;
    this._shortcut = dto.shortcut;
  }
}
