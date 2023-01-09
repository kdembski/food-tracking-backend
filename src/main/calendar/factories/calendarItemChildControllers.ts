import { CustomError } from "@/base/errors/models/customError";
import { CalendarItem } from "@/main/calendar/models/calendarItem";
import { CalendarItemOrderedFoodController } from "../controllers/calendarItemOrderedFood";
import { CalendarItemRecipesController } from "../controllers/calendarItemRecipes";

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

    throw new CustomError({ message: "Calendar item child is missing" });
  }
}
