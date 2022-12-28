import { CalendarItemChildControllersFactory } from "./children/factories/calendarItemChildControllers";
import { CalendarItem } from "@/models/calendarItem";
import {
  CalendarItemDTO,
  ICalendarItemsController,
} from "@/interfaces/calendar/calendarItem";
import { CalendarItemsRepository } from "@/repositories/calendarItems";
import { CalendarItemMembersController } from "./calendarItemMembers";

export class CalendarItemsController implements ICalendarItemsController {
  async getById(id: number) {
    const dto = await new CalendarItemsRepository().selectById(id);
    return new CalendarItem(dto);
  }

  async create(data: CalendarItemDTO) {
    const calendarItem = new CalendarItem(data);
    const results = await new CalendarItemsRepository().insert(calendarItem);
    await new CalendarItemMembersController().addCalendarItemToMembers(
      results.insertId,
      calendarItem.members || []
    );

    this.updateChildLastDate(calendarItem);

    return results;
  }

  async update(data: CalendarItemDTO) {
    const calendarItem = new CalendarItem(data);
    const results = await new CalendarItemsRepository().update(calendarItem);

    this.updateChildLastDate(calendarItem);

    return results;
  }

  async delete(id: number) {
    const calendarItemsRepository = new CalendarItemsRepository();
    const dto = await calendarItemsRepository.selectById(id);
    const results = await calendarItemsRepository.delete(id);

    const calendarItem = new CalendarItem(dto);
    this.updateChildLastDate(calendarItem);

    return results;
  }

  private async updateChildLastDate(item: CalendarItem) {
    const childController = await new CalendarItemChildControllersFactory(
      item
    ).getChildController();

    if (!childController) {
      return;
    }

    childController.updateLastDate();
  }
}
