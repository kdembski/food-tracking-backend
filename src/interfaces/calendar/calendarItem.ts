import { CalendarItem } from "@/models/calendarItem";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "../base/dbEntity";
import { CalendarDay } from "./calendarDay";

export type CalendarItemDTO = {
  id?: number;
  date?: Date;
  recipeId?: number;
  orderedFoodId?: number;
  members?: number[];
  sortOrder?: number;
};

export interface ICalendarItem extends IDbEntityModel<CalendarItemDTO> {
  loadMembers: () => void;
}

export interface ICalendarItemsRepository
  extends IRepository<CalendarItem, CalendarItemDTO> {
  selectAll: (fromDate: Date, toDate: Date) => Promise<CalendarItemDTO[]>;
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
  extends IDbEntityController<CalendarItem, CalendarItemDTO>,
    IGetCalendarItemsController {}

export interface IGetCalendarItemsController {
  getDays: (
    fromDate: Date,
    toDate: Date,
    members: number[]
  ) => Promise<CalendarDay[]>;
}
