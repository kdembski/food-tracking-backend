import { CalendarItem } from "@/main/calendar/models/calendarItem";
import { CRUDRoutesBuilder } from "../_shared/crud";
import { CalendarItemDTO } from "@/dtos/calendar/calendarItem";
import { CalendarItemsController } from "@/controllers/calendar/calendarItems";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";

export class CalendarItemsRoutesBuilder
  extends CRUDRoutesBuilder<CalendarItem, CalendarItemDTO, CalendarItemDTO>
  implements IRoutesBuilder
{
  protected controller: CalendarItemsController;
  readonly path = "/calendar";

  constructor(controller = new CalendarItemsController()) {
    super(controller);
    this.controller = controller;
  }

  override build() {
    this.router.get("/", (req, res) => this.controller.getDays(req, res));
    this.router.patch("/:id/members", (req, res) =>
      this.controller.updateCalendarItemForMembers(req, res)
    );
    super.build();
  }
}
