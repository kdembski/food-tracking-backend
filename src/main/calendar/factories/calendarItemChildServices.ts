import { CustomError } from "@/base/errors/models/customError";
import { CalendarItem } from "@/main/calendar/models/calendarItem";
import { CalendarItemOrderedFoodService } from "../services/calendarItemOrderedFood";
import { CalendarItemRecipesService } from "../services/calendarItemRecipes";

export class CalendarItemChildServicesFactory {
  private recipeId?: number;
  private orderedFoodId?: number;

  constructor(calendarItem: CalendarItem) {
    this.recipeId = calendarItem.recipeId;
    this.orderedFoodId = calendarItem.orderedFoodId;
  }

  async getChildService() {
    if (this.recipeId) {
      return new CalendarItemRecipesService(this.recipeId);
    }

    if (this.orderedFoodId) {
      return new CalendarItemOrderedFoodService(this.orderedFoodId);
    }

    throw new CustomError({ message: "Calendar item child is missing" });
  }
}
