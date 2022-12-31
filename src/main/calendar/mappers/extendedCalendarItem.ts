import { ExtendedCalendarItemDTO } from "./../dtos/extendedCalendarItem";
import { CalendarItem } from "@/main/calendar/models/calendarItem";

export class ExtendedCalendarItemMapper {
  toDTO(item: CalendarItem) {
    return {
      id: item.id,
      date: item.date,
      recipeId: item.recipeId,
      orderedFoodId: item.orderedFoodId,
      sortOrder: item.sortOrder,
    };
  }

  toDomain(dto: ExtendedCalendarItemDTO) {
    const baseDto = {
      id: dto.id,
      date: dto.date,
      recipeId: dto.recipeId,
      orderedFoodId: dto.orderedFoodId,
      name: dto.recipeName || dto.orderedFoodName,
      tags: dto.recipeTags || dto.orderedFoodTags,
      sortOrder: dto.sortOrder,
    };
    return new CalendarItem(baseDto);
  }
}
