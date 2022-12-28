import { CalendarItemOrderedFoodAdapter } from "./adapters/calendarItemOrderedFood";
import { OrderedFoodController } from "@/controllers/orderedFood";
import { OrderedFoodDTO } from "@/interfaces/orderedFood";
import { OrderedFood } from "@/models/ordered-food/orderedFood";
import { CalendarItemsRepository } from "@/repositories/calendarItems";
import { CalendarItemChildController } from "./calendarItemChild";

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
