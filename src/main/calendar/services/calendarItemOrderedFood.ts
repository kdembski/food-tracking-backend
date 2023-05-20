import { CalendarItemOrderedFoodAdapter } from "../adapters/calendarItemOrderedFood";
import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { CalendarItemsRepository } from "@/repositories/calendarItems";
import { CalendarItemChildService } from "./calendarItemChild";

export class CalendarItemOrderedFoodService extends CalendarItemChildService<OrderedFood> {
  constructor(orderedFoodId: number) {
    super(new CalendarItemOrderedFoodAdapter(orderedFoodId), orderedFoodId);
  }

  getCalendarItemChildDates(fromDate: Date, toDate: Date) {
    return new CalendarItemsRepository().selectDatesByOrderedFoodId(
      this.childId,
      fromDate,
      toDate
    );
  }
}
