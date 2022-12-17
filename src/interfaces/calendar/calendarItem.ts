import { CalendarItem } from "@/models/calendarItem";
import { OkPacket } from "mysql2";
import { CalendarDay } from "./calendarDay";

export type CalendarItemDTO = {
  id?: number;
  date?: Date;
  recipeId?: number;
  orderedFoodId?: number;
  members?: number[];
  sortOrder?: number;
};

export interface ICalendarItem {
  setFromDTO: (data: CalendarItemDTO) => void;
  getDTO: () => CalendarItemDTO;
  loadMembers: () => void;
}

export interface ICalendarItemsRepository {
  selectById: (id: number) => Promise<CalendarItemDTO>;
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
  insert: (data: CalendarItem) => Promise<OkPacket>;
  update: (data: CalendarItem) => Promise<OkPacket>;
  delete: (id: number) => Promise<OkPacket>;
}

export interface ICalendarItemsController extends IGetCalendarItemsController {
  createCalendarItem: (data: CalendarItemDTO) => Promise<OkPacket>;
  updateCalendarItem: (data: CalendarItemDTO) => Promise<OkPacket>;
  deleteCalendarItem: (id: number) => Promise<OkPacket>;
}

export interface IGetCalendarItemsController {
  getCalendarItems: (
    fromDate: Date,
    toDate: Date,
    members: number[]
  ) => Promise<CalendarDay[]>;
}
