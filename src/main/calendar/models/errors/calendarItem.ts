import { IErrors } from "@/interfaces/_shared/errors/errors";
import { FieldError } from "@/types/_shared/errors";

export class CalendarItemErrors implements IErrors {
  date?: FieldError;
  childId?: FieldError;

  constructor(data: { date?: FieldError; childId?: FieldError }) {
    this.date = data.date;
    this.childId = data.childId;
  }

  isEmpty() {
    return !this.date && !this.childId;
  }
}
