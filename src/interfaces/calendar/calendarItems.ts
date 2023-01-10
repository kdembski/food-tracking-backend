import {
  CalendarItemDTO,
  CalendarItemQueryResult,
} from "@/dtos/calendar/calendarItem";
import { CalendarDaysCollection } from "@/main/calendar/collections/calendarDays";
import { CalendarItem } from "@/main/calendar/models/calendarItem";
import { IDbEntityController, IRepository } from "../base/dbEntity";

export interface ICalendarItem {
  loadMembers: () => void;
}

export interface ICalendarItemsRepository
  extends IRepository<CalendarItem, CalendarItemQueryResult> {
  selectAll: (
    fromDate: Date,
    toDate: Date
  ) => Promise<CalendarItemQueryResult[]>;
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
  extends IDbEntityController<CalendarItem, CalendarItemDTO> {
  getDays: (
    fromDate: Date,
    toDate: Date,
    members: number[]
  ) => Promise<CalendarDaysCollection>;
}
