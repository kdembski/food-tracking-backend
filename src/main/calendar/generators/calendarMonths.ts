import { startOfMonth, subMonths } from "date-fns";
import { CalendarMonth } from "../models/calendarMonth";

export class CalendarMonthsGenerator {
  execute(monthsAmount: number) {
    return Array(monthsAmount)
      .fill(undefined)
      .map((_, index) => {
        const date = startOfMonth(
          subMonths(new Date(), monthsAmount - 1 - index)
        );
        return new CalendarMonth(date.getMonth(), date.getFullYear());
      });
  }
}
