import { isEqual } from "date-fns";
import { ICalendarItemChildAdapter } from "@/interfaces/calendar/calendarItemChildAdapter";
import { CRUDService } from "@/main/_shared/crud/services/crud";
import { ICalendarItemChildService } from "@/interfaces/calendar/calendarItemChildService";
import { ICalendarItemChildDatesManager } from "@/interfaces/calendar/calendarItemChildDatesManager";

export class CalendarItemChildService<Model, QueryResult>
  implements ICalendarItemChildService
{
  childAdapter: ICalendarItemChildAdapter<Model>;
  childService: CRUDService<Model, QueryResult>;
  datesManager: ICalendarItemChildDatesManager;

  constructor(
    childAdapter: ICalendarItemChildAdapter<Model>,
    childService: CRUDService<Model, QueryResult>,
    datesManager: ICalendarItemChildDatesManager
  ) {
    this.childAdapter = childAdapter;
    this.childService = childService;
    this.datesManager = datesManager;
  }

  async updateLastDate(id: number) {
    const childItem = await this.childService.getById(id);
    this.childAdapter.item = childItem;

    const lastDate = await this.datesManager.getLastDate(id);
    const currentDate = this.childAdapter.date;

    if (currentDate && lastDate && isEqual(lastDate, currentDate)) {
      return;
    }

    this.childAdapter.date = lastDate;
    await this.childService.update(this.childAdapter.item);
  }
}
