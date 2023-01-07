import { OrderedFoodController } from "@/main/ordered-food/controllers/orderedFood";
import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { ICalendarItemChildAdapter } from "@/interfaces/calendar/calendarItemChild";
import { CustomError } from "@/base/errors/models/customError";

export class CalendarItemOrderedFoodAdapter
  implements ICalendarItemChildAdapter<OrderedFood>
{
  private _item?: OrderedFood;
  private _itemId: number;

  constructor(itemId: number) {
    this._itemId = itemId;
  }

  async loadItem() {
    this.item = await new OrderedFoodController().getById(this._itemId);
  }

  get item() {
    if (!this._item) {
      throw new CustomError({
        message: "Calendar child adapter item not loaded",
      });
    }

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
