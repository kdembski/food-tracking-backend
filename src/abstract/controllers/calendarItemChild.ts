import { ICalendarItemChildController } from "@/interfaces/calendar/calendarItemChild";
import { endOfMonth, endOfYear, startOfMonth, startOfYear } from "date-fns";

export abstract class CalendarItemChildController
  implements ICalendarItemChildController
{
  protected abstract getCalendarItemChildDates(
    childId: number,
    fromDate: Date,
    toDate: Date
  ): Promise<Date[]>;

  getDates(
    childId: number,
    fromDate = new Date(1970, 1, 1),
    toDate = new Date(2070, 1, 1)
  ) {
    return this.getCalendarItemChildDates(childId, fromDate, toDate);
  }

  async getLastDate(childId: number) {
    const dates = await this.getDates(childId);
    const sortedDates = dates.sort((a, b) => b.getTime() - a.getTime());
    return sortedDates[0];
  }

  getDatesInCurrentMonth(childId: number) {
    const today = new Date();

    return this.getDates(childId, startOfMonth(today), endOfMonth(today));
  }

  getDatesInCurrentYear(childId: number) {
    const today = new Date();

    return this.getDates(childId, startOfYear(today), endOfYear(today));
  }
}
