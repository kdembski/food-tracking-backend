import { Router } from "express";
import CalendarController from "../controllers/calendar/controller.js";
import { getRequestQueryParameters } from "../utils/request-helpers.js";

const calendarRouter = Router();

calendarRouter.get("/", (request, response) => {
  const { fromDate, toDate } = getRequestQueryParameters(request);
  CalendarController.getCalendar(fromDate, toDate)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

calendarRouter.post("/", (request, response) => {
  const data = request.body;
  data.date = new Date(data.date);

  CalendarController.addDateToCalendar(data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

calendarRouter.put("/:id", (request, response) => {
  const id = request.params.id;
  const data = request.body;
  data.date = new Date(data.date);

  CalendarController.updateDateInCalendar(id, data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

calendarRouter.delete("/:id", (request, response) => {
  const id = request.params.id;

  CalendarController.deleteDateFromCalendar(id)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

export default calendarRouter;
