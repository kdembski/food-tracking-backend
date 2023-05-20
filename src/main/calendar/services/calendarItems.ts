import { CalendarItem } from "@/main/calendar/models/calendarItem";
import { CalendarItemsRepository } from "@/repositories/calendarItems";
import { CalendarItemMembersService } from "./calendarItemMembers";
import { CalendarItemChildServicesFactory } from "../factories/calendarItemChildServices";
import { CalendarItemQueryResultMapper } from "@/mappers/calendar/calendarItemQueryResult";
import { CalendarItemsCollection } from "../collections/calendarItems";
import { CalendarDaysCollection } from "../collections/calendarDays";
import { IDbEntityService } from "@/interfaces/base/db-entity/dbEntityService";

export class CalendarItemsService implements IDbEntityService<CalendarItem> {
  async getDays(fromDate: Date, toDate: Date, members?: number[]) {
    const dtos = await new CalendarItemsRepository().selectAll(
      fromDate,
      toDate
    );
    const calendarItems = new CalendarItemsCollection(
      dtos.map((dto) => new CalendarItemQueryResultMapper().toDomain(dto))
    );
    await calendarItems.filterByMembers(members);
    const calendarDays = new CalendarDaysCollection(calendarItems.items);

    return calendarDays;
  }

  async getById(id: number) {
    const dto = await new CalendarItemsRepository().selectById(id);
    return new CalendarItem(dto);
  }

  async create(calendarItem: CalendarItem) {
    const results = await new CalendarItemsRepository().insert(calendarItem);
    await new CalendarItemMembersService().addCalendarItemToMembers(
      results.insertId,
      calendarItem.members || []
    );

    this.updateChildLastDate(calendarItem);

    return results;
  }

  async update(calendarItem: CalendarItem) {
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
    const childService = await new CalendarItemChildServicesFactory(
      item
    ).getChildService();

    if (!childService) {
      return;
    }

    childService.updateLastDate();
  }
}
