import { Unit } from "@/main/ingredients/models/unit";
import { UnitValidator } from "@/main/ingredients/validators/unit";

describe("Unit Validator", () => {
  let validator: UnitValidator;
  let unit: Unit;

  beforeEach(() => {
    validator = new UnitValidator();

    unit = new Unit({
      id: 1,
      name: "name",
      shortcut: "shortcut",
    });
  });

  it("Should determine if errors are empty", async () => {
    validator.validate(unit);
    expect(validator.errors?.isEmpty()).toBe(true);
  });

  it("Should require unit name", async () => {
    unit.name = "";
    validator.validate(unit);
    expect(validator.errors).toEqual({
      name: validator.getRequiredFieldError(),
      shortcut: undefined,
    });
  });

  it("Should require shortcut name", async () => {
    unit.shortcut = "";
    validator.validate(unit);
    expect(validator.errors).toEqual({
      name: undefined,
      shortcut: validator.getRequiredFieldError(),
    });
  });
});
