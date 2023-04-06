import { IngredientUnitDTO } from "@/dtos/ingredients/ingredientUnit";
import { IIngredientUnit } from "@/interfaces/ingredients/ingredientUnits";

export class IngredientUnit implements IIngredientUnit {
  private _id?: number;
  private _ingredientId?: number;
  private _unitId?: number;
  private _unitName?: string;
  private _unitShortcut?: string;
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

  get unitShortcut() {
    return this._unitShortcut;
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

  set id(value) {
    this._id = value;
  }

  set unitId(value) {
    this._unitId = value;
  }

  set unitName(value) {
    this._unitName = value;
  }

  set unitShortcut(value) {
    this._unitShortcut = value;
  }

  set kcalPerUnit(value) {
    this._kcalPerUnit = value;
  }

  set isPrimary(value) {
    this._isPrimary = value;
  }

  set converterToPrimary(value) {
    this._converterToPrimary = value;
  }

  set ingredientId(value) {
    this._ingredientId = value = value;
  }

  constructor(dto: IngredientUnitDTO) {
    this._id = dto.id;
    this._ingredientId = dto.ingredientId;
    this._unitId = dto.unitId;
    this._unitName = dto.unitName;
    this._unitShortcut = dto.unitShortcut;
    this._kcalPerUnit = dto.kcalPerUnit;
    this._isPrimary = dto.isPrimary;
    this._converterToPrimary = dto.converterToPrimary;
  }
}
