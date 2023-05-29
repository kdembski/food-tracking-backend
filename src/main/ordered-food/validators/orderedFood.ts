import { Validator } from "@/_shared/errors/validator";
import { OrderedFood } from "../models/orderedFood";
import { OrderedFoodErrors } from "../models/errors/orderedFood";

export class OrderedFoodValidator extends Validator<OrderedFood> {
  private _errors?: OrderedFoodErrors;

  get errors() {
    return this._errors;
  }

  override throwErrors() {
    super.throwErrors(this.errors);
  }

  validate(model: OrderedFood) {
    this._errors = new OrderedFoodErrors({
      foodName: this.getFoodNameError(model.foodName),
      placeName: this.getPlaceNameError(model.placeName),
    });

    return this;
  }

  getFoodNameError(foodName?: string) {
    if (!foodName) {
      return this.getRequiredFieldError();
    }

    return;
  }

  getPlaceNameError(placeName?: string) {
    if (!placeName) {
      return this.getRequiredFieldError();
    }

    return;
  }
}
