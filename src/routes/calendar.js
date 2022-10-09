import { Router } from "express";
import CalendarController from "../controllers/calendar.js";

const calendarRouter = Router();

calendarRouter.post("/", (request, response) => {
  const data = request.body;

  CalendarController.addToCalendar(data)
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

export default calendarRouter;
