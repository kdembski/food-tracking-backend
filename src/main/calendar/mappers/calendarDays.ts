import { CalendarDay } from "../models/calendarDay";
import { CalendarItemMapper } from "./calendarItem";

export class CalendarDaysMapper {
  toDTO(days: CalendarDay[]) {
    return days.map((day) => ({
      date: day.date,
      items: day.items.map((item) => new CalendarItemMapper().toDTO(item)),
    }));
  }
}
