import { RecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { IRecipeIngredient } from "@/interfaces/recipes/recipeIngredients";

export class RecipeIngredient implements IRecipeIngredient {
  private _id?: number;
  private _recipeId?: number;
  private _ingredientUnitId?: number;
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

  constructor(dto: RecipeIngredientDTO) {
    this.setFromDTO(dto);
  }

  setFromDTO(data: RecipeIngredientDTO) {
    this._id = data.id;
    this._recipeId = data.recipeId;
    this._ingredientUnitId = data.ingredientUnitId;
    this._amount = data.amount;
    this._ingredientName = data.ingredientName;
    this._unitShortcut = data.unitShortcut;
    this._kcalPerUnit = data.kcalPerUnit;
    this._isPrimary = data.isPrimary;
    this._converterToPrimary = data.converterToPrimary;
  }

  getDTO() {
    return {
      id: this.id,
      ingredierecipeIdtId: this.recipeId,
      ingredientUnitId: this._ingredientUnitId,
      amount: this.amount,
      ingredientName: this.ingredientName,
      unitShortcut: this.unitShortcut,
      kcalPerUnit: this.kcalPerUnit,
      isPrimary: this.isPrimary,
      converterToPrimary: this.converterToPrimary,
    };
  }
}
