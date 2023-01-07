import { CalendarItemOrderedFoodAdapter } from "./../adapters/calendarItemOrderedFood";
import { OrderedFoodController } from "@/main/ordered-food/controllers/orderedFood";
import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { CalendarItemsRepository } from "@/repositories/calendarItems";
import { CalendarItemChildController } from "./calendarItemChild";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { OrderedFoodMapper } from "@/main/ordered-food/mappers/orderedFood";

export class CalendarItemOrderedFoodController extends CalendarItemChildController<
  OrderedFood,
  OrderedFoodDTO
> {
  constructor(orderedFoodId: number) {
    super(
      new OrderedFoodController(),
      new OrderedFoodMapper(),
      new CalendarItemOrderedFoodAdapter(orderedFoodId),
      orderedFoodId
    );
  }

  getCalendarItemChildDates(fromDate: Date, toDate: Date) {
    return new CalendarItemsRepository().selectDatesByOrderedFoodId(
      this.childId,
      fromDate,
      toDate
    );
  }
}
