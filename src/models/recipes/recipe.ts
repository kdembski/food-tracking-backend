import { IRecipe, RecipeDTO } from "@/interfaces/recipes/recipes";

export class Recipe implements IRecipe {
  private _id?: number;
  private _recipeName?: string;
  private _preparationTime?: number;
  private _tags?: string;
  private _kcal?: number;
  private _cookedDate?: Date;
  private _cookidooLink?: string;
  private _cookedDatesInCurrentMonth?: Date[];

  constructor(data: RecipeDTO) {
    this.setFromDTO(data);
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

  get cookedDatesInCurrentMonth() {
    return this._cookedDatesInCurrentMonth;
  }

  set cookedDatesInCurrentMonth(value) {
    this._cookedDatesInCurrentMonth = value;
  }

  set cookedDate(value) {
    this._cookedDate = value ? new Date(value) : undefined;
  }

  setFromDTO(data: RecipeDTO) {
    this._id = data.id;
    this._recipeName = data.recipeName;
    this._preparationTime = data.preparationTime;
    this._tags = data.tags;
    this._kcal = data.kcal;
    this.cookedDate = data.cookedDate;
    this._cookidooLink = data.cookidooLink;
  }

  getDTO() {
    return {
      id: this.id,
      recipeName: this.recipeName,
      preparationTime: this.preparationTime,
      tags: this.tags,
      kcal: this.kcal,
      cookedDate: this.cookedDate,
      cookidooLink: this.cookidooLink,
      cookedDatesInCurrentMonth: this.cookedDatesInCurrentMonth,
    };
  }
}
