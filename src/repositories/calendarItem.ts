import { OkPacket } from "mysql2";
import { CalendarItem } from "@/models/calendarItem";
import Database from "@/config/database";
import {
  CalendarItemDTO,
  ICalendarItemsRepository,
} from "@/interfaces/calendar/calendarItem";
import calendarItemsQueries from "@/queries/calendarItems";

export class CalendarItemsRepository implements ICalendarItemsRepository {
  async selectById(id: number) {
    const results = await Database.sendQuery(calendarItemsQueries.selectById, [
      id,
    ]);
    return results[0] as CalendarItemDTO;
  }

  async selectDatesByRecipeId(recipeId: number, fromDate: Date, toDate: Date) {
    const results = await Database.sendQuery(
      calendarItemsQueries.selectDatesByRecipeId,
      [recipeId, fromDate, toDate]
    );

    return results.map((result: { date: Date }) => result.date) as Date[];
  }

  async selectDatesByOrderedFoodId(
    orderedFoodId: number,
    fromDate: Date,
    toDate: Date
  ) {
    const results = await Database.sendQuery(
      calendarItemsQueries.selectDatesByOrderedFoodId,
      [orderedFoodId, fromDate, toDate]
    );

    return results.map((result: { date: Date }) => result.date) as Date[];
  }

  async selectAll(fromDate: Date, toDate: Date) {
    const results = await Database.sendQuery(calendarItemsQueries.select, [
      fromDate,
      toDate,
    ]);
    return results as CalendarItemDTO[];
  }

  async insert(data: CalendarItem) {
    const results = await Database.sendQuery(calendarItemsQueries.insert, [
      data.date,
      data.recipeId,
      data.orderedFoodId,
      data.sortOrder,
    ]);
    return results as OkPacket;
  }

  async update(data: CalendarItem) {
    const results = await Database.sendQuery(calendarItemsQueries.update, [
      data.date,
      data.recipeId,
      data.orderedFoodId,
      data.sortOrder,
      data.id,
    ]);
    return results as OkPacket;
  }

  async delete(id: number) {
    const results = await Database.sendQuery(calendarItemsQueries.delete, [id]);
    return results as OkPacket;
  }
}
