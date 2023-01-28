import { OkPacket } from "mysql2";
import { CalendarItem } from "@/main/calendar/models/calendarItem";
import Database from "@/config/database";
import { ICalendarItemsRepository } from "@/interfaces/calendar/calendarItems";
import { CustomError } from "@/base/errors/models/customError";
import { CalendarItemQueryResult } from "@/dtos/calendar/calendarItem";
import { CalendarItemsQueries } from "@/queries/calendarItems";

export class CalendarItemsRepository implements ICalendarItemsRepository {
  async selectById(id: number) {
    const query = new CalendarItemsQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    return results[0] as CalendarItemQueryResult;
  }

  async selectDatesByRecipeId(recipeId: number, fromDate: Date, toDate: Date) {
    const query = new CalendarItemsQueries().getSelectDatesByRecipeId(
      fromDate,
      toDate
    );
    const results = await Database.sendQuery(query, [recipeId]);

    return results.map((result: { date: Date }) => result.date) as Date[];
  }

  async selectDatesByOrderedFoodId(
    orderedFoodId: number,
    fromDate: Date,
    toDate: Date
  ) {
    const query = new CalendarItemsQueries().getSelectDatesByOrderedFoodId(
      fromDate,
      toDate
    );
    const results = await Database.sendQuery(query, [orderedFoodId]);

    return results.map((result: { date: Date }) => result.date) as Date[];
  }

  async selectAll(fromDate: Date, toDate: Date) {
    const query = new CalendarItemsQueries().getDateRangeSelect(
      fromDate,
      toDate
    );
    const results = await Database.sendQuery(query);

    return results as CalendarItemQueryResult[];
  }

  async insert(item: CalendarItem) {
    if (!item.recipeId && !item.orderedFoodId) {
      throw new CustomError({
        message: "No child assigned to item",
      });
    }

    const query = new CalendarItemsQueries().getInsert();
    const results = await Database.sendQuery(query, [
      item.date,
      item.recipeId,
      item.orderedFoodId,
      item.sortOrder,
    ]);

    return results as OkPacket;
  }

  async update(item: CalendarItem) {
    const query = new CalendarItemsQueries().getUpdate();
    const results = await Database.sendQuery(query, [
      item.date,
      item.recipeId,
      item.orderedFoodId,
      item.sortOrder,
      item.id,
    ]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const query = new CalendarItemsQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);

    return results as OkPacket;
  }
}
