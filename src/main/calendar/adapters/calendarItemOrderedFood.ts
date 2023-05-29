import { OrderedFoodService } from "@/main/ordered-food/services/orderedFood";
import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { ICalendarItemChildAdapter } from "@/interfaces/calendar/calendarItemChildAdapter";
import { CustomError } from "@/_shared/errors/models/customError";

export class CalendarItemOrderedFoodAdapter
  implements ICalendarItemChildAdapter<OrderedFood>
{
  private orderedFood?: OrderedFood;

  get item() {
    if (!this.orderedFood) {
      throw new CustomError({
        message: "Calendar child adapter item not loaded",
      });
    }

    return this.orderedFood;
  }

  set item(value) {
    this.orderedFood = value;
  }

  get date() {
    return this.item.orderedDate;
  }

  set date(date: Date | undefined) {
    this.item.orderedDate = date;
  }
}
