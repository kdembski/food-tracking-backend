import {
  IDbEntityController,
  IDbEntityModel,
} from "@/interfaces/base/dbEntity";
import { ICalendarItemChildController } from "@/interfaces/calendar/calendarItemChild";
import { endOfMonth, isEqual, startOfMonth, subMonths } from "date-fns";

export abstract class CalendarItemChildController<
  Item extends IDbEntityModel<ItemDTO>,
  ItemDTO
> implements ICalendarItemChildController
{
  private childController: IDbEntityController<Item, ItemDTO>;

  constructor(childController: IDbEntityController<Item, ItemDTO>) {
    this.childController = childController;
  }

  protected abstract getCalendarItemChildDates(
    childId: number,
    fromDate: Date,
    toDate: Date
  ): Promise<Date[]>;

  protected abstract getDate(item: Item): Date | undefined;
  protected abstract setDate(item: Item, date: Date): void;

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

  async updateLastDate(childId: number) {
    const child = await this.childController.getById(childId);
    const lastDate = await this.getLastDate(childId);
    const currentDate = this.getDate(child);

    if (currentDate && lastDate && isEqual(lastDate, currentDate)) {
      return;
    }

    this.setDate(child, lastDate);
    await this.childController.update(child.getDTO());
  }

  getDatesInCurrentMonth(childId: number) {
    const today = new Date();

    return this.getDates(childId, startOfMonth(today), endOfMonth(today));
  }

  async getDatesFromLastYear(childId: number) {
    const today = new Date();

    const dates = await this.getDates(
      childId,
      startOfMonth(subMonths(today, 11)),
      today
    );

    const months: {
      number: number;
      year: number;
      dates: Date[];
    }[] = Array(12)
      .fill(undefined)
      .map((_, index) => {
        const date = startOfMonth(subMonths(today, 11 - index));
        return {
          number: date.getMonth(),
          year: date.getFullYear(),
          dates: [],
        };
      });

    dates.forEach((date) => {
      const monthNumber = date.getMonth();
      const year = date.getFullYear();
      const month = months.find(
        (month) => month.number === monthNumber && month.year === year
      );
      month?.dates.push(date);
    });

    return months.map((month) => month.dates);
  }
}
