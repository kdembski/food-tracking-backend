import { Validator } from "@/_shared/errors/validator";
import { CalendarItem } from "../models/calendarItem";
import { CalendarItemErrors } from "../models/errors/calendarItem";

export class CalendarItemValidator extends Validator<CalendarItem> {
  private _errors?: CalendarItemErrors;

  get errors() {
    return this._errors;
  }

  override throwErrors() {
    super.throwErrors(this.errors);
  }

  validate(model: CalendarItem) {
    this._errors = new CalendarItemErrors({
      date: this.getNameError(model.date),
      childId: this.getChildIdError(model),
    });

    return this;
  }

  getNameError(date?: Date) {
    if (!date) {
      return this.getRequiredFieldError();
    }

    return;
  }

  getChildIdError(model: CalendarItem) {
    if (!model.recipeId && !model.orderedFoodId) {
      return this.getRequiredFieldError();
    }

    return;
  }
}
