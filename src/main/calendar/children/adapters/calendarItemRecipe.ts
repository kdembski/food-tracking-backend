import { Recipe } from "@/main/recipes/models/recipe";
import { ICalendarItemChild } from "@/interfaces/calendar/calendarItemChild";

export class CalendarItemRecipeAdapter implements ICalendarItemChild<Recipe> {
  private _item: Recipe;

  constructor(recipe: Recipe) {
    this._item = recipe;
  }

  get item() {
    return this._item;
  }

  set item(value) {
    this._item = value;
  }
  getDate() {
    return this.item.cookedDate;
  }

  setDate(date: Date): void {
    this.item.cookedDate = date;
  }
}
