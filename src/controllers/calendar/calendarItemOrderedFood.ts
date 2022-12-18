import { CalendarItemChildController } from "@/abstract/controllers/calendarItemChild";
import { CalendarItemsRepository } from "@/repositories/calendarItems";

export class CalendarItemOrderedFoodController extends CalendarItemChildController {
  protected getCalendarItemChildDates(
    orderedFoodId: number,
    fromDate: Date,
    toDate: Date
  ) {
    return new CalendarItemsRepository().selectDatesByOrderedFoodId(
      orderedFoodId,
      fromDate,
      toDate
    );
  }
}
