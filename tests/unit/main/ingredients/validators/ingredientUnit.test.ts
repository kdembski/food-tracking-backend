import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";
import { IngredientUnitValidator } from "@/main/ingredients/validators/ingredientUnit";

describe("IngredientUnit Validator", () => {
  let validator: IngredientUnitValidator;
  let ingredientUnit: IngredientUnit;

  beforeEach(() => {
    validator = new IngredientUnitValidator();

    ingredientUnit = new IngredientUnit({
      unitId: 1,
      kcalPerUnit: 1,
      isPrimary: false,
      converterToPrimary: 1,
    });
  });

  it("Should determine if errors are empty", async () => {
    validator.validate(ingredientUnit);
    expect(validator.errors?.isEmpty()).toBe(true);
  });

  it("Should require unitId", async () => {
    ingredientUnit.unitId = undefined;
    validator.validate(ingredientUnit);
    expect(validator.errors).toEqual({
      unitId: validator.getRequiredFieldError(),
      kcalPerUnit: undefined,
      converterToPrimary: undefined,
    });
  });

  it("Should require kcalPerUnit", async () => {
    ingredientUnit.kcalPerUnit = undefined;
    validator.validate(ingredientUnit);
    expect(validator.errors).toEqual({
      unitId: undefined,
      kcalPerUnit: validator.getRequiredFieldError(),
      converterToPrimary: undefined,
    });
  });

  it("Should require converterToPrimary", async () => {
    ingredientUnit.converterToPrimary = undefined;
    validator.validate(ingredientUnit);
    expect(validator.errors).toEqual({
      unitId: undefined,
      kcalPerUnit: undefined,
      converterToPrimary: validator.getRequiredFieldError(),
    });
  });
});
