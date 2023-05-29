import { IErrors } from "@/interfaces/_shared/errors/errors";
import { FieldError } from "@/types/_shared/errors";

export class UnitErrors implements IErrors {
  name?: FieldError;
  shortcut?: FieldError;

  constructor(data: { name?: FieldError; shortcut?: FieldError }) {
    this.name = data.name;
    this.shortcut = data.shortcut;
  }

  isEmpty() {
    return !this.name && !this.shortcut;
  }
}
