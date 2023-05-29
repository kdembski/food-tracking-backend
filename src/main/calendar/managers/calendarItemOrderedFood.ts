import { CalendarItemsRepository } from "@/repositories/calendar/calendarItems";
import { CalendarItemChildDatesManager } from "./calendarItemChildDates";

export class CalendarItemOrderedFoodDatesManager extends CalendarItemChildDatesManager {
  private calendarItemsRepository: CalendarItemsRepository;

  constructor(calendarItemsRepository = new CalendarItemsRepository()) {
    super();
    this.calendarItemsRepository = calendarItemsRepository;
  }

  getDates(
    id: number,
    fromDate = new Date(1970, 1, 1),
    toDate = new Date(2070, 1, 1)
  ) {
    return this.calendarItemsRepository.selectDatesByOrderedFoodId(
      id,
      fromDate,
      toDate
    );
  }
}
