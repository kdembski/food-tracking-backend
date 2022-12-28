import { CalendarMonthsGenerator } from "../generators/calendarMonths";
import { CalendarMonth } from "../models/calendarMonth";

export class CalendarMonthsCollection {
  private months: CalendarMonth[];

  constructor(monthsAmount: number) {
    this.months = new CalendarMonthsGenerator().execute(monthsAmount);
  }

  fill(dates: Date[]) {
    dates.forEach((date) => {
      const monthNumber = date.getMonth();
      const year = date.getFullYear();

      const month = this.find(monthNumber, year);
      month?.addDate(date);
    });
  }

  find(number: number, year: number) {
    return this.months.find(
      (month) => month.number === number && month.year === year
    );
  }

  getDates() {
    return this.months.map((month) => month.dates);
  }
}
