import { OkPacket } from "mysql2";
import { CalendarItem } from "@/main/calendar/models/calendarItem";
import Database from "@/config/database";
import { ICalendarItemsRepository } from "@/interfaces/calendar/calendarItems";
import { calendarItemsQueries } from "@/queries/calendarItems";
import { CustomError } from "@/base/errors/models/customError";
import { CalendarItemQueryResult } from "@/dtos/calendar/calendarItem";

export class CalendarItemsRepository implements ICalendarItemsRepository {
  async selectById(id: number) {
    const results = await Database.sendQuery(calendarItemsQueries.selectById, [
      id,
    ]);
    return results[0] as CalendarItemQueryResult;
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
    return results as CalendarItemQueryResult[];
  }

  async insert(item: CalendarItem) {
    if (!item.recipeId && !item.orderedFoodId) {
      throw new CustomError({
        message: "No child assigned to item",
      });
    }

    const results = await Database.sendQuery(calendarItemsQueries.insert, [
      item.date,
      item.recipeId,
      item.orderedFoodId,
      item.sortOrder,
    ]);
    return results as OkPacket;
  }

  async update(item: CalendarItem) {
    const results = await Database.sendQuery(calendarItemsQueries.update, [
      item.date,
      item.recipeId,
      item.orderedFoodId,
      item.sortOrder,
      item.id,
    ]);
    return results as OkPacket;
  }

  async delete(id: number) {
    const results = await Database.sendQuery(calendarItemsQueries.delete, [id]);
    return results as OkPacket;
  }
}
