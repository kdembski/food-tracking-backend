import { IngredientUnitsCollection } from "./../collections/ingredientUnits";
import { IngredientPayload } from "@/dtos/ingredients/ingredient";
import { IIngredient } from "@/interfaces/ingredients/ingredients";
import { IngredientUnit } from "./ingredientUnit";

export class Ingredient implements IIngredient {
  private _id?: number;
  private _name?: string;
  private _categoryId?: number;
  private _categoryName?: string;
  private _units?: IngredientUnitsCollection;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get categoryId() {
    return this._categoryId;
  }

  get categoryName() {
    return this._categoryName;
  }

  get units() {
    return this._units;
  }

  set units(value) {
    this._units = value;
  }

  constructor(dto: IngredientPayload) {
    this._id = dto.id;
    this._name = dto.name;
    this._categoryId = dto.categoryId;
    this._categoryName = dto.categoryName;
    this._units = dto.units;
  }
}
