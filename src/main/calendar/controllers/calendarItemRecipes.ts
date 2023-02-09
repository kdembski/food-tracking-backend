import { Recipe } from "@/main/recipes/models/recipe";
import { CalendarItemsRepository } from "@/repositories/calendarItems";
import { CalendarItemRecipeAdapter } from "../adapters/calendarItemRecipe";
import { CalendarItemChildController } from "./calendarItemChild";

export class CalendarItemRecipesController extends CalendarItemChildController<Recipe> {
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
