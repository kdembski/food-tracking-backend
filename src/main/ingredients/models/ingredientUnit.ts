import { IngredientUnitDTO } from "@/dtos/ingredients/ingredientUnit";
import { IIngredientUnit } from "@/interfaces/ingredients/ingredientUnits";

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
    this._id = dto.id;
    this._ingredientId = dto.ingredientId;
    this._unitId = dto.unitId;
    this._unitName = dto.unitName;
    this._kcalPerUnit = dto.kcalPerUnit;
    this._isPrimary = dto.isPrimary;
    this._converterToPrimary = dto.converterToPrimary;
  }
}
