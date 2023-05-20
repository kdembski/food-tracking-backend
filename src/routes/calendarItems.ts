import { CalendarItemMembersService } from "@/main/calendar/services/calendarItemMembers";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { Router } from "express";
import { ApiError } from "@/base/errors/models/apiError";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { CalendarItemsService } from "@/main/calendar/services/calendarItems";
import { CalendarItemDTO } from "@/dtos/calendar/calendarItem";
import { CalendarDaysMapper } from "@/mappers/calendar/calendarDays";
import { CalendarItem } from "@/main/calendar/models/calendarItem";

const calendarItemsRouter = Router();
const calendarItemsService = new CalendarItemsService();
const calendarItemMembersService = new CalendarItemMembersService();

calendarItemsRouter.get("/", async (request, response) => {
  try {
    const { fromDate, toDate, members } = new RequestQueryHelper(request.query);

    const calendarDays = await calendarItemsService.getDays(
      fromDate || new Date(1970, 0, 0),
      toDate || new Date(2070, 0, 0),
      members
    );
    const dtos = new CalendarDaysMapper().toDTO(calendarDays.items);
    response.json(dtos);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

calendarItemsRouter.post("/", async (request, response) => {
  try {
    const data: CalendarItemDTO = request.body;
    const calendarItem = new CalendarItem(data);

    const results = await calendarItemsService.create(calendarItem);
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
    const calendarItem = new CalendarItem(data);

    const results = await calendarItemsService.update(calendarItem);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

calendarItemsRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await calendarItemsService.delete(id);
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
      await calendarItemMembersService.updateCalendarItemForMembers(
        id,
        memberIds
      );
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default calendarItemsRouter;
