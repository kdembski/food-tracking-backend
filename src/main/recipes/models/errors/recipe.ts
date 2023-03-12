import { IErrors } from "@/interfaces/base/errors";
import { FieldError } from "@/types/base/errors";

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
