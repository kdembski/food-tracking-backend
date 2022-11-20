import { Router } from "express";
import CalendarItemController from "../controllers/calendar-item/controller.js";
import { getRequestQueryParameters } from "../utils/request-helpers.js";

const calendarItemRouter = Router();

calendarItemRouter.get("/", (request, response) => {
  const { fromDate, toDate } = getRequestQueryParameters(request);
  CalendarItemController.getCalendarItems(fromDate, toDate)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

calendarItemRouter.post("/", (request, response) => {
  const data = request.body;
  data.date = new Date(data.date);

  CalendarItemController.addCalendarItem(data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

calendarItemRouter.put("/:id", (request, response) => {
  const id = request.params.id;
  const data = request.body;
  data.date = new Date(data.date);

  CalendarItemController.updateCalendarItem(id, data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

calendarItemRouter.delete("/:id", (request, response) => {
  const id = request.params.id;

  CalendarItemController.deleteCalendarItem(id)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

export default calendarItemRouter;
