import { OrderedFoodController } from "@/main/ordered-food/controllers/orderedFood";
import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { CalendarItemsRepository } from "@/repositories/calendarItems";
import { CalendarItemChildController } from "./calendarItemChild";
import { CalendarItemOrderedFoodAdapter } from "../adapters/calendarItemOrderedFood";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";

export class CalendarItemOrderedFoodController extends CalendarItemChildController<
  OrderedFood,
  OrderedFoodDTO
> {
  constructor(orderedFoodId: number) {
    super(new OrderedFoodController(), orderedFoodId);
  }

  getCalendarItemChildDates(fromDate: Date, toDate: Date) {
    return new CalendarItemsRepository().selectDatesByOrderedFoodId(
      this.childId,
      fromDate,
      toDate
    );
  }

  async getAdaptedCalendarItemChild() {
    const orderedFood = await this.childController.getById(this.childId);
    return new CalendarItemOrderedFoodAdapter(orderedFood);
  }
}
