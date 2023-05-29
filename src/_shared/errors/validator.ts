import { COMPLEX_ERROR, FIELD_REQUIRED } from "@/consts/errorCodes";
import { CustomError } from "./models/customError";
import { IValidator } from "@/interfaces/_shared/errors/validator";
import { IErrors } from "@/interfaces/_shared/errors/errors";

export abstract class Validator<Model> implements IValidator<Model> {
  throwErrors(errors?: IErrors) {
    if (!errors || errors.isEmpty()) {
      return;
    }

    throw new CustomError({
      code: COMPLEX_ERROR,
      status: 400,
      message: JSON.stringify(errors),
    });
  }

  abstract validate(model: Model): IValidator<Model>;

  getRequiredFieldError() {
    return {
      code: FIELD_REQUIRED,
      message: "Pole wymagane",
    };
  }
}
