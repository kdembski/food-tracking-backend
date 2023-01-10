import { ExtendedRecipeDTO } from "@/dtos/recipes/recipe";
import { IRecipe } from "@/interfaces/recipes/recipes";
import { CalendarItemRecipesController } from "@/main/calendar/controllers/calendarItemRecipes";

export class Recipe implements IRecipe {
  private _id?: number;
  private _recipeName?: string;
  private _preparationTime?: number;
  private _tags?: string;
  private _kcal?: number;
  private _cookedDate?: Date;
  private _cookidooLink?: string;
  private _datesFromLastYear?: Date[][];

  constructor(data: ExtendedRecipeDTO) {
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

  set datesFromLastYear(value) {
    this._datesFromLastYear = value;
  }

  set cookedDate(value) {
    this._cookedDate = value ? new Date(value) : undefined;
  }

  async setDatesFromLastYear() {
    if (!this.id) {
      return;
    }
    this.datesFromLastYear = await new CalendarItemRecipesController(
      this.id
    ).getDatesFromLastYear();
  }
}
