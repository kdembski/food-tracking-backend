import { IngredientUnitsCollection } from "@/main/ingredients/collections/ingredientUnits";
import { Ingredient } from "@/main/ingredients/models/ingredient";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";
import { IngredientValidator } from "@/main/ingredients/validators/ingredient";

describe("Ingredient Validator", () => {
  let validator: IngredientValidator;
  let ingredient: Ingredient;

  beforeEach(() => {
    validator = new IngredientValidator();

    ingredient = new Ingredient({
      id: 1,
      name: "name",
      categoryId: 1,
      units: new IngredientUnitsCollection([]),
    });
  });

  it("Should determine if errors are empty", async () => {
    validator.validate(ingredient);
    expect(validator.errors?.isEmpty()).toBe(true);
  });

  it("Should require ingredient name", async () => {
    ingredient.name = "";
    validator.validate(ingredient);
    expect(validator.errors).toEqual({
      categoryId: undefined,
      name: validator.getRequiredFieldError(),
      units: [],
    });
  });

  it("Should require category id", async () => {
    ingredient.categoryId = undefined;
    validator.validate(ingredient);
    expect(validator.errors).toEqual({
      categoryId: validator.getRequiredFieldError(),
      name: undefined,
      units: [],
    });
  });

  it("Should determine if unit error are empty", async () => {
    ingredient.units = new IngredientUnitsCollection([
      new IngredientUnit({
        unitId: 1,
        kcalPerUnit: 1,
        isPrimary: false,
        converterToPrimary: 1,
      }),
    ]);

    validator.validate(ingredient);
    expect(validator.errors?.isEmpty()).toBe(true);
  });
});
