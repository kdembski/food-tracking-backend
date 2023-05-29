import { IErrors } from "@/interfaces/_shared/errors/errors";
import { FieldError } from "@/types/_shared/errors";

export class OrderedFoodErrors implements IErrors {
  foodName?: FieldError;
  placeName?: FieldError;

  constructor(data: { foodName?: FieldError; placeName?: FieldError }) {
    this.foodName = data.foodName;
    this.placeName = data.placeName;
  }

  isEmpty() {
    return !this.foodName && !this.placeName;
  }
}
