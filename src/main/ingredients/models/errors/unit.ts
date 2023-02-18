import { IErrors } from "@/interfaces/base/errors";
import { FieldError } from "@/types/base/errors";

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
