import { IErrors } from "@/interfaces/_shared/errors/errors";
import { IngredientUnitErrors } from "./ingredientUnit";
import { FieldError } from "@/types/_shared/errors";

export class IngredientErrors implements IErrors {
  name?: FieldError;
  categoryId?: FieldError;
  units?: IngredientUnitErrors[];

  constructor(data: {
    name?: FieldError;
    categoryId?: FieldError;
    units?: IngredientUnitErrors[];
  }) {
    this.name = data.name;
    this.categoryId = data.categoryId;
    this.units = data.units;
  }

  isEmpty() {
    return !this.name && !this.categoryId && this.isUnitsEmpty();
  }

  isUnitsEmpty() {
    if (!this.units) {
      return true;
    }

    return this.units.every((item) => item.isEmpty());
  }
}
