import { CalendarItemChildController } from "@/abstract/controllers/calendarItemChild";
import { CalendarItemsRepository } from "@/repositories/calendarItems";

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
