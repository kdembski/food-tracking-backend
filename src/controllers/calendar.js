import calendarQueries from "../queries/calendar.js";
import Database from "../config/database.js";

class CalendarController {
  static addToCalendar(data) {
    return Database.sendQuery(calendarQueries.insert, [
      data.date,
      data.recipeId,
      data.orderedFoodId,
      data.portions,
    ]);
  }
}

export default CalendarController;
