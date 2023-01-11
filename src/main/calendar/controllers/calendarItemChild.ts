import { CalendarMonthsCollection } from "../collections/calendarMonths";
import { isEqual, startOfMonth, subMonths } from "date-fns";
import { IDbEntityController } from "@/interfaces/base/dbEntity";
import { ICalendarItemChildAdapter } from "@/interfaces/calendar/calendarItemChild";

export abstract class CalendarItemChildController<Model, ModelDTO> {
  private childController: IDbEntityController<Model>;
  private childAdapter: ICalendarItemChildAdapter<Model>;
  protected childId: number;

  constructor(
    childController: IDbEntityController<Model>,
    childAdapter: ICalendarItemChildAdapter<Model>,
    childId: number
  ) {
    this.childController = childController;
    this.childAdapter = childAdapter;
    this.childId = childId;
  }

  protected abstract getCalendarItemChildDates(
    fromDate: Date,
    toDate: Date
  ): Promise<Date[]>;

  getDates(fromDate = new Date(1970, 1, 1), toDate = new Date(2070, 1, 1)) {
    return this.getCalendarItemChildDates(fromDate, toDate);
  }

  async getLastDate() {
    const dates = await this.getDates();
    const sortedDates = dates.sort((a, b) => b.getTime() - a.getTime());
    return sortedDates[0];
  }

  async updateLastDate() {
    await this.childAdapter.loadItem();
    const lastDate = await this.getLastDate();
    const currentDate = this.childAdapter.getDate();

    if (currentDate && lastDate && isEqual(lastDate, currentDate)) {
      return;
    }

    this.childAdapter.setDate(lastDate);
    await this.childController.update(this.childAdapter.item);
  }

  async getDatesFromLastYear() {
    const today = new Date();

    const dates = await this.getDates(
      startOfMonth(subMonths(today, 11)),
      today
    );

    const months = new CalendarMonthsCollection(12);
    months.fill(dates);
    return months.getDates();
  }
}
