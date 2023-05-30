import { CalendarDay } from "@/main/calendar/models/calendarDay";
import { CalendarItemMapper } from "./calendarItem";
import { IToDTOMapper } from "@/interfaces/_shared/mappers/toDtoMapper";
import { CalendarItemDTO } from "@/dtos/calendar/calendarItem";

export class CalendarDaysMapper
  implements
    IToDTOMapper<CalendarDay[], { date: Date; items: CalendarItemDTO[] }[]>
{
  toDTO(days: CalendarDay[]) {
    return days.map((day) => ({
      date: day.date,
      items: day.items.map((item) => new CalendarItemMapper().toDTO(item)),
    }));
  }
}
