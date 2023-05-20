import { Recipe } from "@/main/recipes/models/recipe";
import { CalendarItemsRepository } from "@/repositories/calendarItems";
import { CalendarItemRecipeAdapter } from "../adapters/calendarItemRecipe";
import { CalendarItemChildService } from "./calendarItemChild";

export class CalendarItemRecipesService extends CalendarItemChildService<Recipe> {
  constructor(recipeId: number) {
    super(new CalendarItemRecipeAdapter(recipeId), recipeId);
  }

  getCalendarItemChildDates(fromDate: Date, toDate: Date) {
    return new CalendarItemsRepository().selectDatesByRecipeId(
      this.childId,
      fromDate,
      toDate
    );
  }
}
