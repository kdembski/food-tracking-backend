import { CalendarDay } from "../models/calendarDay";
import { BaseCalendarItemMapper } from "./baseCalendarItem";

export class CalendarDaysMapper {
  toDTO(days: CalendarDay[]) {
    return days.map((day) => ({
      date: day.date,
      items: day.items.map((item) => new BaseCalendarItemMapper().toDTO(item)),
    }));
  }
}
