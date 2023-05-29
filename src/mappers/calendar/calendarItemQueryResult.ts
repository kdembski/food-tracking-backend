import { CalendarItemQueryResult } from "@/dtos/calendar/calendarItem";
import { IMapper } from "@/interfaces/_shared/mapper";
import { CalendarItem } from "@/main/calendar/models/calendarItem";

export class CalendarItemQueryResultMapper
  implements IMapper<CalendarItem, CalendarItemQueryResult>
{
  toDTO(item: CalendarItem) {
    return {
      id: item.id,
      date: item.date,
      recipeId: item.recipeId,
      orderedFoodId: item.orderedFoodId,
      sortOrder: item.sortOrder,
    };
  }

  toDomain(dto: CalendarItemQueryResult) {
    const baseDto = {
      id: dto.id,
      date: dto.date,
      recipeId: dto.recipeId,
      orderedFoodId: dto.orderedFoodId,
      name: dto.recipeName || dto.orderedFoodName,
      tags: dto.recipeTags || dto.orderedFoodTags,
      sortOrder: dto.sortOrder,
      members: dto.memberIds?.split(",").map((id) => parseInt(id)) || [],
    };
    return new CalendarItem(baseDto);
  }
}
