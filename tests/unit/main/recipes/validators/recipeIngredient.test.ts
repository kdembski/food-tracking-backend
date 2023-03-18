import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { RecipeIngredientValidator } from "@/main/recipes/validators/recipeIngredient";

describe("Recipe Ingredient Validator", () => {
  let validator: RecipeIngredientValidator;
  let recipeIngredient: RecipeIngredient;

  beforeEach(() => {
    validator = new RecipeIngredientValidator();

    recipeIngredient = new RecipeIngredient({
      ingredientId: 1,
      unitId: 2,
      amount: 20,
    });
  });

  it("Should determine if errors are empty", async () => {
    validator.validate(recipeIngredient);
    expect(validator.errors?.isEmpty()).toBe(true);
  });

  it("Should require ingredientId", async () => {
    recipeIngredient.ingredientId = undefined;
    validator.validate(recipeIngredient);
    expect(validator.errors).toEqual({
      ingredientId: validator.getRequiredFieldError(),
      unitId: undefined,
      amount: undefined,
    });
  });

  it("Should require unitId", async () => {
    recipeIngredient.unitId = undefined;
    validator.validate(recipeIngredient);
    expect(validator.errors).toEqual({
      ingredientId: undefined,
      unitId: validator.getRequiredFieldError(),
      amount: undefined,
    });
  });

  it("Should require amount", async () => {
    recipeIngredient.amount = undefined;
    validator.validate(recipeIngredient);
    expect(validator.errors).toEqual({
      ingredientId: undefined,
      unitId: undefined,
      amount: validator.getRequiredFieldError(),
    });
  });
});
