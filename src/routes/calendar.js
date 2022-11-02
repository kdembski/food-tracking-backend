import { Router } from "express";
import CalendarController from "../controllers/calendar/index.js";
import { getRequestQueryParameters } from "../utils/request-helpers.js";

const calendarRouter = Router();

calendarRouter.get("/", (request, response) => {
  const { fromDate, toDate } = getRequestQueryParameters(request);
  CalendarController.getCalendar(fromDate, toDate)
    .then((results) => response.json(results))
    .catch((error) => {
      response.status(400).json(error);
      console.log(error);
    });
});

calendarRouter.post("/", (request, response) => {
  const data = request.body;
  data.date = new Date(data.date);

  CalendarController.addDateToCalendar(data)
    .then((results) => response.json(results))
    .catch((error) => {
      response.status(400).json(error);
      console.log(error);
    });
});

calendarRouter.put("/:id", (request, response) => {
  const id = request.params.id;
  const data = request.body;
  data.date = new Date(data.date);

  CalendarController.updateDateInCalendar(id, data)
    .then((results) => response.json(results))
    .catch((error) => {
      response.status(400).json(error);
      console.log(error);
    });
});

calendarRouter.delete("/:id", (request, response) => {
  const id = request.params.id;

  CalendarController.deleteDateFromCalendar(id)
    .then((results) => response.json(results))
    .catch((error) => {
      response.status(400).json(error);
      console.log(error);
    });
});

export default calendarRouter;
