import { RecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";

export class RecipeIngredient {
  private _id?: number;
  private _recipeId?: number;
  private _ingredientUnitId?: number;
  private _ingredientId?: number;
  private _unitId?: number;
  private _amount?: number;
  private _ingredientName?: string;
  private _unitShortcut?: string;
  private _kcalPerUnit?: number;
  private _isPrimary?: boolean;
  private _converterToPrimary?: number;

  get id() {
    return this._id;
  }

  get recipeId() {
    return this._recipeId;
  }

  get ingredientUnitId() {
    return this._ingredientUnitId;
  }

  get ingredientId() {
    return this._ingredientId;
  }

  get unitId() {
    return this._unitId;
  }

  get amount() {
    return this._amount;
  }

  get ingredientName() {
    return this._ingredientName;
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

  set recipeId(value) {
    this._recipeId = value;
  }

  set ingredientUnitId(value) {
    this._ingredientUnitId = value;
  }

  set ingredientId(value) {
    this._ingredientId = value;
  }

  set unitId(value) {
    this._unitId = value;
  }

  set amount(value) {
    this._amount = value;
  }

  set ingredientName(value) {
    this._ingredientName = value;
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

  constructor(data: RecipeIngredientDTO) {
    this._id = data.id;
    this._recipeId = data.recipeId;
    this._ingredientUnitId = data.ingredientUnitId;
    this._ingredientId = data.ingredientId;
    this._unitId = data.unitId;
    this._amount = data.amount;
    this._ingredientName = data.ingredientName;
    this._unitShortcut = data.unitShortcut;
    this._kcalPerUnit = data.kcalPerUnit;
    this._isPrimary = data.isPrimary;
    this._converterToPrimary = data.converterToPrimary;
  }
}
