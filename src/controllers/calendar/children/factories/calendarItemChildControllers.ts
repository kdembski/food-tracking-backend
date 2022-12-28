import { CalendarItemOrderedFoodController } from "@/controllers/calendar/children/calendarItemOrderedFood";
import { CalendarItemRecipesController } from "@/controllers/calendar/children/calendarItemRecipes";
import { CalendarItem } from "@/models/calendarItem";

export class CalendarItemChildControllersFactory {
  private recipeId?: number;
  private orderedFoodId?: number;

  constructor(calendarItem: CalendarItem) {
    this.recipeId = calendarItem.recipeId;
    this.orderedFoodId = calendarItem.orderedFoodId;
  }

  async getChildController() {
    if (this.recipeId) {
      return new CalendarItemRecipesController(this.recipeId);
    }

    if (this.orderedFoodId) {
      return new CalendarItemOrderedFoodController(this.orderedFoodId);
    }

    return;
  }
}
