import { BaseCalendarItemDTO } from "@/dtos/calendar/calendarItem";
import { Mapper } from "@/interfaces/base/mapper";
import { CalendarItem } from "@/main/calendar/models/calendarItem";

export class BaseCalendarItemMapper
  implements Mapper<CalendarItem, BaseCalendarItemDTO>
{
  toDTO(item: CalendarItem) {
    return {
      id: item.id,
      date: item.date,
      recipeId: item.recipeId,
      orderedFoodId: item.orderedFoodId,
      name: item.name,
      tags: item.tags,
      members: item.members,
      sortOrder: item.sortOrder,
    };
  }

  toDomain(dto: BaseCalendarItemDTO) {
    return new CalendarItem(dto);
  }
}
