import calendarModel from "../models/calendar.js";
import Database from "../config/database.js";

class CalendarController {
  static setRoutes(router) {
    router.post("/calendar", this.#addToCalendar);
  }

  static #addToCalendar(request, response) {
    const data = request.body;

    Database.sendQuery(calendarModel.insertToCalendar, [
      data.date,
      data.recipeId,
      data.orderedFoodId,
      data.portions,
    ])
      .then((results) => response.json(results))
      .catch((error) => response.status(400).send(error));
  }
}

export default CalendarController;
