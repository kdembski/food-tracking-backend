import { OrderedFood } from "@/models/ordered-food/orderedFood";
import { Recipe } from "@/models/recipes/recipe";
import { CalendarItem } from "@/models/calendarItem";
import {
  CalendarItemDTO,
  ICalendarItemsController,
} from "@/interfaces/calendar/calendarItem";
import { GetCalendarItemsController } from "./getCalendarItems";
import { CalendarItemsRepository } from "@/repositories/calendarItems";
import { CalendarItemMembersController } from "./calendarItemMembers";

export class CalendarItemsController implements ICalendarItemsController {
  getCalendarItems(fromDate: Date, toDate: Date, members?: number[]) {
    return new GetCalendarItemsController().getCalendarItems(
      fromDate,
      toDate,
      members
    );
  }

  async createCalendarItem(data: CalendarItemDTO) {
    const calendarItem = new CalendarItem(data);
    const results = await new CalendarItemsRepository().insert(calendarItem);
    await new CalendarItemMembersController().addCalendarItemToMembers(
      results.insertId,
      calendarItem.members || []
    );

    this.updateChildDates(calendarItem);

    return results;
  }

  async updateCalendarItem(data: CalendarItemDTO) {
    const calendarItem = new CalendarItem(data);
    const results = await new CalendarItemsRepository().update(calendarItem);

    this.updateChildDates(calendarItem);

    return results;
  }

  async deleteCalendarItem(id: number) {
    const calendarItemsRepository = new CalendarItemsRepository();
    const dto = await calendarItemsRepository.selectById(id);
    const results = await calendarItemsRepository.delete(id);

    const calendarItem = new CalendarItem(dto);
    this.updateChildDates(calendarItem);

    return results;
  }

  private updateChildDates(item: CalendarItem) {
    if (item.recipeId) {
      new Recipe({ id: item.recipeId }).updateCookedDate();
    }
    if (item.orderedFoodId) {
      new OrderedFood({ id: item.orderedFoodId }).updateOrderedDate();
    }
  }
}
