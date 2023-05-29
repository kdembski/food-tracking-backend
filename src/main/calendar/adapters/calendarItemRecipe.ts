import { Recipe } from "@/main/recipes/models/recipe";
import { ICalendarItemChildAdapter } from "@/interfaces/calendar/calendarItemChildAdapter";
import { CustomError } from "@/_shared/errors/models/customError";

export class CalendarItemRecipeAdapter
  implements ICalendarItemChildAdapter<Recipe>
{
  private recipe?: Recipe;

  get item() {
    if (!this.recipe) {
      throw new CustomError({
        message: "Calendar child adapter item not loaded",
      });
    }

    return this.recipe;
  }

  set item(value) {
    this.recipe = value;
  }

  get date() {
    return this.item.cookedDate;
  }

  set date(date: Date | undefined) {
    this.item.cookedDate = date;
  }
}
