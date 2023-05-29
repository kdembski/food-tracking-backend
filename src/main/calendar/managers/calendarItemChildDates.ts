import { ICalendarItemChildDatesManager } from "@/interfaces/calendar/calendarItemChildDatesManager";
import { CalendarMonthsCollection } from "../collections/calendarMonths";
import { startOfMonth, subMonths } from "date-fns";

export abstract class CalendarItemChildDatesManager
  implements ICalendarItemChildDatesManager
{
  abstract getDates(
    id: number,
    fromDate?: Date,
    toDate?: Date
  ): Promise<Date[]>;

  async getLastDate(id: number) {
    const dates = await this.getDates(id);
    const sortedDates = dates.sort((a, b) => b.getTime() - a.getTime());
    return sortedDates[0];
  }

  async getDatesFromLastYear(id: number) {
    const today = new Date();

    const dates = await this.getDates(
      id,
      startOfMonth(subMonths(today, 11)),
      today
    );

    const months = new CalendarMonthsCollection(12);
    months.fill(dates);
    return months.getDates();
  }
}
