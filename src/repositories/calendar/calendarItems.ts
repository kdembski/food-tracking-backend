import { CalendarItem } from "@/main/calendar/models/calendarItem";
import { CRUDRepository } from "../_shared/crud";
import { CalendarItemQueryResult } from "@/dtos/calendar/calendarItem";
import { Database } from "@/config/database";
import { CalendarItemsQueries } from "@/queries/calendar/calendarItems";

export class CalendarItemsRepository extends CRUDRepository<
  CalendarItem,
  CalendarItemQueryResult
> {
  protected queries: CalendarItemsQueries;

  constructor(
    database = Database.getInstance(),
    queries = new CalendarItemsQueries()
  ) {
    super(database, queries);
    this.queries = queries;
  }

  async selectDatesByRecipeId(recipeId: number, fromDate: Date, toDate: Date) {
    const query = this.queries.getSelectDatesByRecipeId(fromDate, toDate);
    const results = await this.database.sendQuery(query, [recipeId]);

    return results.map((result: { date: Date }) => result.date) as Date[];
  }

  async selectDatesByOrderedFoodId(
    orderedFoodId: number,
    fromDate: Date,
    toDate: Date
  ) {
    const query = this.queries.getSelectDatesByOrderedFoodId(fromDate, toDate);
    const results = await this.database.sendQuery(query, [orderedFoodId]);

    return results.map((result: { date: Date }) => result.date) as Date[];
  }

  async selectAll(fromDate: Date, toDate: Date) {
    const query = this.queries.getDateRangeSelect(fromDate, toDate);
    const results = await this.database.sendQuery(query);

    return results as CalendarItemQueryResult[];
  }

  getFieldsToInsert(model: CalendarItem) {
    return [model.date, model.recipeId, model.orderedFoodId, model.sortOrder];
  }

  getFieldsToUpdate(model: CalendarItem) {
    return [
      model.date,
      model.recipeId,
      model.orderedFoodId,
      model.sortOrder,
      model.id,
    ];
  }
}
