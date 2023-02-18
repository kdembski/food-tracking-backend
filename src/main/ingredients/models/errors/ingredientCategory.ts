import { IErrors } from "@/interfaces/base/errors";
import { FieldError } from "@/types/base/errors";

export class IngredientCategoryErrors implements IErrors {
  name?: FieldError;

  constructor(data: { name?: FieldError }) {
    this.name = data.name;
  }

  isEmpty() {
    return !this.name;
  }
}
