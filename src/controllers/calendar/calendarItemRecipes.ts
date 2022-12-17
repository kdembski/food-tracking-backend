import { CalendarItemChildController } from "@/abstract/controllers/calendarItemChild";
import { CalendarItemsRepository } from "@/repositories/calendarItem";

export class CalendarItemRecipesController extends CalendarItemChildController {
  protected getCalendarItemChildDates(
    recipeId: number,
    fromDate: Date,
    toDate: Date
  ) {
    return new CalendarItemsRepository().selectDatesByRecipeId(
      recipeId,
      fromDate,
      toDate
    );
  }
}
