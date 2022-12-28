import {
  IngredientUnitDTO,
  IIngredientUnit,
} from "@/interfaces/ingredients/ingredientUnits";

export class IngredientUnit implements IIngredientUnit {
  private _id?: number;
  private _ingredientId?: number;
  private _unitId?: number;
  private _unitName?: string;
  private _kcalPerUnit?: number;
  private _isPrimary?: boolean;
  private _converterToPrimary?: number;

  get id() {
    return this._id;
  }

  get ingredientId() {
    return this._ingredientId;
  }

  get unitId() {
    return this._unitId;
  }

  get unitName() {
    return this._unitName;
  }

  get kcalPerUnit() {
    return this._kcalPerUnit;
  }

  get isPrimary() {
    return this._isPrimary;
  }

  get converterToPrimary() {
    return this._converterToPrimary;
  }

  constructor(dto: IngredientUnitDTO) {
    this.setFromDTO(dto);
  }

  setFromDTO(data: IngredientUnitDTO) {
    this._id = data.id;
    this._ingredientId = data.ingredientId;
    this._unitId = data.unitId;
    this._unitName = data.unitName;
    this._kcalPerUnit = data.kcalPerUnit;
    this._isPrimary = data.isPrimary;
    this._converterToPrimary = data.converterToPrimary;
  }

  getDTO() {
    return {
      id: this.id,
      ingredientId: this.ingredientId,
      unitId: this.unitId,
      unitName: this.unitName,
      kcalPerUnit: this.kcalPerUnit,
      isPrimary: this.isPrimary,
      converterToPrimary: this.converterToPrimary,
    };
  }
}
