import { CalendarItemQueryResult } from "@/dtos/calendar/calendarItem";
import { IToDomainMapper } from "@/interfaces/_shared/mappers/toDomainMapper";
import { CalendarItem } from "@/main/calendar/models/calendarItem";

export class CalendarItemQueryResultMapper
  implements IToDomainMapper<CalendarItem, CalendarItemQueryResult>
{
  toDomain(dto: CalendarItemQueryResult) {
    return new CalendarItem({
      id: dto.id,
      date: dto.date,
      recipeId: dto.recipeId,
      orderedFoodId: dto.orderedFoodId,
      name: dto.recipeName || dto.orderedFoodName,
      tags: dto.recipeTags || dto.orderedFoodTags,
      sortOrder: dto.sortOrder,
      members: dto.memberIds?.split(",").map((id) => parseInt(id)) || [],
    });
  }
}
