import { OrderedFoodController } from "@/controllers/orderedFood";
import { OrderedFoodDTO } from "@/interfaces/orderedFood";
import { OrderedFood } from "@/models/ordered-food/orderedFood";
import { CalendarItemChildController } from "@/abstract/controllers/calendarItemChild";
import { CalendarItemsRepository } from "@/repositories/calendarItems";

export class CalendarItemOrderedFoodController extends CalendarItemChildController<
  OrderedFood,
  OrderedFoodDTO
> {
  constructor() {
    super(new OrderedFoodController());
  }

  protected getCalendarItemChildDates(
    orderedFoodId: number,
    fromDate: Date,
    toDate: Date
  ) {
    return new CalendarItemsRepository().selectDatesByOrderedFoodId(
      orderedFoodId,
      fromDate,
      toDate
    );
  }

  protected getDate(orederedFood: OrderedFood) {
    return orederedFood.orderedDate;
  }

  protected setDate(orederedFood: OrderedFood, date: Date): void {
    orederedFood.orderedDate = date;
  }
}
