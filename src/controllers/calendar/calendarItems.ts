import { Request, Response } from "express";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { CalendarItemsService } from "@/main/calendar/services/calendarItems";
import { CalendarItemDTO } from "@/dtos/calendar/calendarItem";
import { CalendarDaysMapper } from "@/mappers/calendar/calendarDays";
import { CalendarItem } from "@/main/calendar/models/calendarItem";
import { ApiError } from "@/_shared/errors/models/apiError";
import { CalendarItemValidator } from "@/main/calendar/validators/calendarItem";
import { CRUDController } from "../_shared/crud";
import { CalendarItemMapper } from "@/mappers/calendar/calendarItem";
import { CalendarItemMembersService } from "@/main/calendar/services/calendarItemMembers";

export class CalendarItemsController extends CRUDController<
  CalendarItem,
  CalendarItemDTO,
  CalendarItemDTO
> {
  protected service: CalendarItemsService;
  protected validator: CalendarItemValidator;
  private daysMapper: CalendarDaysMapper;
  private calendarItemMembersService: CalendarItemMembersService;

  constructor(
    service = new CalendarItemsService(),
    mapper = new CalendarItemMapper(),
    daysMapper = new CalendarDaysMapper(),
    validator = new CalendarItemValidator(),
    calendarItemMembersService = new CalendarItemMembersService()
  ) {
    super(service, mapper, validator);
    this.service = service;
    this.daysMapper = daysMapper;
    this.validator = validator;
    this.calendarItemMembersService = calendarItemMembersService;
  }

  async getDays(request: Request, response: Response) {
    try {
      const { fromDate, toDate, members } = new RequestQueryHelper(
        request.query
      );

      const calendarDays = await this.service.getDays(
        fromDate || new Date(1970, 0, 0),
        toDate || new Date(2070, 0, 0),
        members
      );

      const dtos = this.daysMapper.toDTO(calendarDays.items);
      response.json(dtos);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async updateCalendarItemForMembers(
    request: Request<{ id: string }, {}, number[]>,
    response: Response
  ) {
    try {
      const id = new RequestParamsHelper(request.params).id;
      const memberIds = request.body;

      const results =
        await this.calendarItemMembersService.updateCalendarItemForMembers(
          id,
          memberIds
        );
      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }
}
