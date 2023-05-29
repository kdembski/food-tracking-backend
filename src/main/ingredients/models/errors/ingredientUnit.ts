import { IErrors } from "@/interfaces/_shared/errors/errors";
import { FieldError } from "@/types/_shared/errors";

export class IngredientUnitErrors implements IErrors {
  unitId?: FieldError;
  kcalPerUnit?: FieldError;
  converterToPrimary?: FieldError;

  constructor(data: {
    unitId?: FieldError;
    kcalPerUnit?: FieldError;
    converterToPrimary?: FieldError;
  }) {
    this.unitId = data.unitId;
    this.kcalPerUnit = data.kcalPerUnit;
    this.converterToPrimary = data.converterToPrimary;
  }

  isEmpty() {
    return !this.unitId && !this.kcalPerUnit && !this.converterToPrimary;
  }
}
