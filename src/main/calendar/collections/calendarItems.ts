import { CalendarItem } from "../models/calendarItem";

export class CalendarItemsCollection {
  private _items: CalendarItem[];

  constructor(items: CalendarItem[]) {
    this._items = items;
  }

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = value;
  }

  filterByMembers = async (members?: number[]) => {
    const promises = this.items.map((item) => item.loadMembers());
    await Promise.all(promises);

    if (!members || members.length === 0) {
      return;
    }

    this.items = this.items.filter((item) => {
      return members.some((id) => item.members?.includes(id));
    });
  };
}
