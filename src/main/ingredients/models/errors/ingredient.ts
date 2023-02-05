import { IErrors } from "@/interfaces/base/errors";
import { FieldError } from "@/types/base/errors";
import { IngredientUnitErrors } from "./ingredientUnit";

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
    return (
      !this.name && !this.categoryId && (!this.units || this.units.length === 0)
    );
  }
}
