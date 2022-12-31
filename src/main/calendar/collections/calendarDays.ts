import { isEqual } from "date-fns";
import { CalendarDay } from "../models/calendarDay";
import { CalendarItem } from "../models/calendarItem";

export class CalendarDaysCollection {
  private _items: CalendarDay[];

  constructor(items: CalendarItem[]) {
    this._items = this.mergeItemsWithSameDate(items);
  }

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = value;
  }

  private mergeItemsWithSameDate = (items: CalendarItem[]) => {
    return items.reduce((days: CalendarDay[], item) => {
      if (!item?.date) {
        return days;
      }

      const day = this.findByDate(item.date, days);
      if (day) {
        day.addItem(item);
        return days;
      }

      days.push(new CalendarDay(item.date, [item]));
      return days;
    }, []);
  };

  private findByDate(date: Date, days = this.items) {
    return days.find((day) => isEqual(day.date, date));
  }
}
