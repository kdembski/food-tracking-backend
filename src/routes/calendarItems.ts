import { CalendarItemMembersController } from "@/controllers/calendar/calendarItemMembers";
import { CalendarItemDTO } from "@/interfaces/calendar/calendarItem";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { CalendarItemsController } from "@/controllers/calendar/calendarItems";
import { Router } from "express";
import { ApiError } from "@/models/errors/apiError";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { GetCalendarItemsController } from "@/controllers/calendar/getCalendarItems";

const calendarItemsRouter = Router();
const calendarItemsController = new CalendarItemsController();
const getCalendarItemsController = new GetCalendarItemsController();
const calendarItemMembersController = new CalendarItemMembersController();

calendarItemsRouter.get("/", async (request, response) => {
  try {
    const { fromDate, toDate, members } = new RequestQueryHelper(
      request.query
    ).getQueryValues();

    const results = await getCalendarItemsController.getDays(
      fromDate || new Date(1970, 0, 0),
      toDate || new Date(2070, 0, 0),
      members
    );
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

calendarItemsRouter.post("/", async (request, response) => {
  try {
    const data: CalendarItemDTO = request.body;

    const results = await calendarItemsController.create(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

calendarItemsRouter.put("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const data: CalendarItemDTO = request.body;
    data.id = id;

    const results = await calendarItemsController.update(data);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

calendarItemsRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await calendarItemsController.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

calendarItemsRouter.patch("/:id/members", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const memberIds: number[] = request.body;

    const results =
      await calendarItemMembersController.updateCalendarItemForMembers(
        id,
        memberIds
      );
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default calendarItemsRouter;
