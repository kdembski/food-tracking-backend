import { Validator } from "@/_shared/errors/validator";
import { IErrors } from "@/interfaces/_shared/errors/errors";

class TestValidator extends Validator<{}> {
  override throwErrors(errors: IErrors) {
    super.throwErrors(errors);
  }

  override getRequiredFieldError() {
    return super.getRequiredFieldError();
  }

  validate() {
    return this;
  }
}
jest.mock("@/_shared/errors/models/customError", () => ({
  CustomError: jest.fn().mockImplementation((data) => data),
}));

describe("Validator", () => {
  let validator: TestValidator;

  beforeEach(() => {
    validator = new TestValidator();
  });

  it("Should throw errors if errors exists and not empty", async () => {
    expect(() =>
      validator.throwErrors({ isEmpty: () => false })
    ).toThrowError();
  });

  it("Should not throw errors if empty", async () => {
    expect(() =>
      validator.throwErrors({ isEmpty: () => true })
    ).not.toThrowError();
  });

  it("Should return default error for required field", async () => {
    expect(validator.getRequiredFieldError()).toEqual({
      code: "FIELD_REQUIRED",
      message: "Pole wymagane",
    });
  });
});
