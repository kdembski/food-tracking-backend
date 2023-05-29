import { IErrors } from "@/interfaces/_shared/errors/errors";
import { FieldError } from "@/types/_shared/errors";

export class RecipeErrors implements IErrors {
  recipeName?: FieldError;
  preparationTime?: FieldError;

  constructor(data: { recipeName?: FieldError; preparationTime?: FieldError }) {
    this.recipeName = data.recipeName;
    this.preparationTime = data.preparationTime;
  }

  isEmpty() {
    return !this.recipeName && !this.preparationTime;
  }
}
