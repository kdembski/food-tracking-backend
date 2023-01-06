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

  constructor(dto: UnitDTO) {
    this.setFromDTO(dto);
  }

  setFromDTO(data: UnitDTO) {
    this._id = data.id;
    this._name = data.name;
    this._shortcut = data.shortcut;
  }

  getDTO() {
    return {
      id: this.id,
      name: this.name,
      shortcut: this._shortcut,
    };
  }
}
