import { ExtendedRecipeDTO } from "@/dtos/recipes/recipe";

export class Recipe {
  private _id?: number;
  private _recipeName?: string;
  private _preparationTime?: number;
  private _tags?: string;
  private _kcal?: number;
  private _cookedDate?: Date;
  private _cookidooLink?: string;
  private _datesFromLastYear?: Date[][];

  constructor(data?: ExtendedRecipeDTO) {
    if (!data) {
      return;
    }

    this._id = data.id;
    this._recipeName = data.recipeName;
    this._preparationTime = data.preparationTime;
    this._tags = data.tags;
    this._kcal = data.kcal;
    this.cookedDate = data.cookedDate;
    this._cookidooLink = data.cookidooLink;
  }

  get id() {
    return this._id;
  }

  get preparationTime() {
    return this._preparationTime;
  }

  get tags() {
    return this._tags;
  }

  get kcal() {
    return this._kcal;
  }

  get recipeName() {
    return this._recipeName;
  }

  get cookedDate() {
    return this._cookedDate;
  }

  get cookidooLink() {
    return this._cookidooLink;
  }

  get datesFromLastYear() {
    return this._datesFromLastYear;
  }

  set id(value) {
    this._id = value;
  }

  set preparationTime(value) {
    this._preparationTime = value;
  }

  set tags(value) {
    this._tags = value;
  }

  set kcal(value) {
    this._kcal = value;
  }

  set recipeName(value) {
    this._recipeName = value;
  }

  set cookedDate(value) {
    this._cookedDate = value ? new Date(value) : undefined;
  }

  set cookidooLink(value) {
    this._cookidooLink = value;
  }

  set datesFromLastYear(value) {
    this._datesFromLastYear = value;
  }
}
