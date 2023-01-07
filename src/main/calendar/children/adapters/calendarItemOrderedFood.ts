import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { ICalendarItemChild } from "@/interfaces/calendar/calendarItemChild";

export class CalendarItemOrderedFoodAdapter
  implements ICalendarItemChild<OrderedFood>
{
  private _item: OrderedFood;

  constructor(orderedFood: OrderedFood) {
    this._item = orderedFood;
  }

  get item() {
    return this._item;
  }

  set item(value) {
    this._item = value;
  }

  getDate() {
    return this.item.orderedDate;
  }

  setDate(date: Date): void {
    this.item.orderedDate = date;
  }
}
