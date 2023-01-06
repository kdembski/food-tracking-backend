import { CalendarItem } from "@/main/calendar/models/calendarItem";

export class CalendarDay {
  private _date: Date;
  private _items: CalendarItem[];

  constructor(date: Date, items: CalendarItem[]) {
    this._date = date;
    this._items = items;
  }

  get date() {
    return this._date;
  }

  get items() {
    return this._items;
  }

  addItem(item: CalendarItem) {
    this.items.push(item);
  }
}
