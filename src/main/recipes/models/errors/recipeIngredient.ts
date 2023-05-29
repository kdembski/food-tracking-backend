import { IErrors } from "@/interfaces/_shared/errors/errors";
import { FieldError } from "@/types/_shared/errors";

export class RecipeIngredientErrors implements IErrors {
  ingredientId?: FieldError;
  unitId?: FieldError;
  amount?: FieldError;

  constructor(data: {
    ingredientId?: FieldError;
    unitId?: FieldError;
    amount?: FieldError;
  }) {
    this.ingredientId = data.ingredientId;
    this.unitId = data.unitId;
    this.amount = data.amount;
  }

  isEmpty() {
    return !this.ingredientId && !this.unitId && !this.amount;
  }
}
