import { IModel } from "@/interfaces/base/models/model";
import { IController } from "@/interfaces/base/controllers/controller";
import { ICalendarItemChildController } from "@/interfaces/calendar/calendarItemChild";
import {
  endOfMonth,
  endOfYear,
  isEqual,
  startOfMonth,
  startOfYear,
} from "date-fns";

export abstract class CalendarItemChildController<
  Item extends IModel<ItemDTO>,
  ItemDTO
> implements ICalendarItemChildController
{
  private childController: IController<Item, ItemDTO>;

  constructor(childController: IController<Item, ItemDTO>) {
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

  getDatesInCurrentYear(childId: number) {
    const today = new Date();

    return this.getDates(childId, startOfYear(today), endOfYear(today));
  }
}
