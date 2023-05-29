import { IErrors } from "@/interfaces/_shared/errors/errors";
import { FieldError } from "@/types/_shared/errors";

export class ShoppingListErrors implements IErrors {
  name?: FieldError;

  constructor(data: { name?: FieldError }) {
    this.name = data.name;
  }

  isEmpty() {
    return !this.name;
  }
}
