import { BaseCalendarItemDTO } from "@/main/calendar/dtos/baseCalendarItem";
import { CalendarDaysDTO } from "@/main/calendar/dtos/calendarDays";
import { ExtendedCalendarItemDTO } from "@/main/calendar/dtos/extendedCalendarItem";
import { CalendarItem } from "@/main/calendar/models/calendarItem";
import { IDbEntityController, IRepository } from "../base/dbEntity";

export interface ICalendarItem {
  loadMembers: () => void;
}

export interface ICalendarItemsRepository
  extends IRepository<CalendarItem, BaseCalendarItemDTO> {
  selectAll: (
    fromDate: Date,
    toDate: Date
  ) => Promise<ExtendedCalendarItemDTO[]>;
  selectDatesByRecipeId: (
    recipeId: number,
    fromDate: Date,
    toDate: Date
  ) => Promise<Date[]>;
  selectDatesByOrderedFoodId: (
    orderedFoodId: number,
    fromDate: Date,
    toDate: Date
  ) => Promise<Date[]>;
}

export interface ICalendarItemsController
  extends IDbEntityController<CalendarItem, BaseCalendarItemDTO> {
  getDays: (
    fromDate: Date,
    toDate: Date,
    members: number[]
  ) => Promise<CalendarDaysDTO[]>;
}
