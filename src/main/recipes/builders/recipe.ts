import { CalendarItemRecipeDatesManager } from "@/main/calendar/managers/calendarItemRecipes";
import { Recipe } from "@/main/recipes/models/recipe";

export class RecipeBuilder {
  private _recipe: Recipe;
  private calendarItemRecipeDatesManager: CalendarItemRecipeDatesManager;

  constructor(
    calendarItemRecipeDatesManager = new CalendarItemRecipeDatesManager()
  ) {
    this._recipe = new Recipe();
    this.calendarItemRecipeDatesManager = calendarItemRecipeDatesManager;
  }

  async produceDatesFromLastYear() {
    if (!this.recipe.id) {
      return;
    }

    const dates =
      await this.calendarItemRecipeDatesManager.getDatesFromLastYear(
        this.recipe.id
      );
    this.recipe.datesFromLastYear = dates;
  }

  get recipe() {
    return this._recipe;
  }

  set recipe(value) {
    this._recipe = value;
  }
}
