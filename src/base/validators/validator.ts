import { CustomError } from "@/base/errors/models/customError";
import { COMPLEX_ERROR, FIELD_REQUIRED } from "@/consts/errorCodes";
import { IErrors } from "@/interfaces/base/errors";

export abstract class Validator {
  protected throwErrors(errors?: IErrors) {
    console.log(errors);
    if (!errors || errors.isEmpty()) {
      return;
    }

    throw new CustomError({
      code: COMPLEX_ERROR,
      status: 400,
      message: JSON.stringify(errors),
    });
  }

  protected getRequiredFieldError() {
    return {
      code: FIELD_REQUIRED,
      message: "Pole wymagane",
    };
  }
}
