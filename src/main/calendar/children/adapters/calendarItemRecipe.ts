import { Recipe } from "@/main/recipes/models/recipe";
import { ICalendarItemChild } from "@/interfaces/calendar/calendarItemChild";
import { RecipeDTO } from "@/dtos/recipes/recipe";

export class CalendarItemRecipeAdapter
  implements ICalendarItemChild<RecipeDTO>
{
  private recipe: Recipe;

  constructor(recipe: Recipe) {
    this.recipe = recipe;
  }

  getDTO() {
    return this.recipe.getDTO();
  }

  getDate() {
    return this.recipe.cookedDate;
  }

  setDate(date: Date): void {
    this.recipe.cookedDate = date;
  }
}
