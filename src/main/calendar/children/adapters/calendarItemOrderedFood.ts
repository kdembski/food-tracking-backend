import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { ICalendarItemChild } from "@/interfaces/calendar/calendarItemChild";
import { OrderedFoodDTO } from "@/interfaces/orderedFood";

export class CalendarItemOrderedFoodAdapter
  implements ICalendarItemChild<OrderedFoodDTO>
{
  private orderedFood: OrderedFood;

  constructor(orderedFood: OrderedFood) {
    this.orderedFood = orderedFood;
  }

  getDTO() {
    return this.orderedFood.getDTO();
  }

  getDate() {
    return this.orderedFood.orderedDate;
  }

  setDate(date: Date): void {
    this.orderedFood.orderedDate = date;
  }
}
