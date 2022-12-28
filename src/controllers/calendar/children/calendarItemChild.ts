import { CalendarMonthsCollection } from "./collections/calendarMonths";
import { isEqual, startOfMonth, subMonths } from "date-fns";
import { IDbEntityController } from "@/interfaces/base/dbEntity";
import { ICalendarItemChild } from "@/interfaces/calendar/calendarItemChild";

export abstract class CalendarItemChildController<Model, ModelDTO> {
  protected childController: IDbEntityController<Model, ModelDTO>;
  protected childId: number;

  constructor(
    childController: IDbEntityController<Model, ModelDTO>,
    childId: number
  ) {
    this.childController = childController;
    this.childId = childId;
  }

  protected abstract getCalendarItemChildDates(
    fromDate: Date,
    toDate: Date
  ): Promise<Date[]>;

  protected abstract getAdaptedCalendarItemChild(): Promise<
    ICalendarItemChild<ModelDTO>
  >;

  getDates(fromDate = new Date(1970, 1, 1), toDate = new Date(2070, 1, 1)) {
    return this.getCalendarItemChildDates(fromDate, toDate);
  }

  async getLastDate() {
    const dates = await this.getDates();
    const sortedDates = dates.sort((a, b) => b.getTime() - a.getTime());
    return sortedDates[0];
  }

  async updateLastDate() {
    const child = await this.getAdaptedCalendarItemChild();
    const lastDate = await this.getLastDate();
    const currentDate = child.getDate();

    if (currentDate && lastDate && isEqual(lastDate, currentDate)) {
      return;
    }

    child.setDate(lastDate);
    await this.childController.update(child.getDTO());
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
