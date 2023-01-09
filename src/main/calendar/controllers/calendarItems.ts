import { CalendarDaysMapper } from "./../mappers/calendarDays";
import { CalendarItem } from "@/main/calendar/models/calendarItem";
import { ICalendarItemsController } from "@/interfaces/calendar/calendarItems";
import { CalendarItemsRepository } from "@/repositories/calendarItems";
import { CalendarItemMembersController } from "./calendarItemMembers";
import { CalendarItemChildControllersFactory } from "../factories/calendarItemChildControllers";
import { ExtendedCalendarItemMapper } from "../mappers/extendedCalendarItem";
import { CalendarItemsCollection } from "../collections/calendarItems";
import { CalendarDaysCollection } from "../collections/calendarDays";
import { BaseCalendarItemDTO } from "@/dtos/calendar/calendarItem";

export class CalendarItemsController implements ICalendarItemsController {
  async getDays(fromDate: Date, toDate: Date, members?: number[]) {
    const dtos = await new CalendarItemsRepository().selectAll(
      fromDate,
      toDate
    );
    const calendarItems = new CalendarItemsCollection(
      dtos.map((dto) => new ExtendedCalendarItemMapper().toDomain(dto))
    );
    await calendarItems.filterByMembers(members);
    const calendarDays = new CalendarDaysCollection(calendarItems.items);

    return calendarDays;
  }

  async getById(id: number) {
    const dto = await new CalendarItemsRepository().selectById(id);
    return new CalendarItem(dto);
  }

  async create(data: BaseCalendarItemDTO) {
    const calendarItem = new CalendarItem(data);
    const results = await new CalendarItemsRepository().insert(calendarItem);
    await new CalendarItemMembersController().addCalendarItemToMembers(
      results.insertId,
      calendarItem.members || []
    );

    this.updateChildLastDate(calendarItem);

    return results;
  }

  async update(data: BaseCalendarItemDTO) {
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
