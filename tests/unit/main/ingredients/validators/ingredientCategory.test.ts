import { IngredientCategory } from "@/main/ingredients/models/ingredientCategory";
import { IngredientCategoryValidator } from "@/main/ingredients/validators/ingredientCategory";

describe("Ingredient Category Validator", () => {
  let validator: IngredientCategoryValidator;
  let category: IngredientCategory;

  beforeEach(() => {
    validator = new IngredientCategoryValidator();

    category = new IngredientCategory({
      id: 1,
      name: "name",
    });
  });

  it("Should determine if errors are empty", async () => {
    validator.validate(category);
    expect(validator.errors?.isEmpty()).toBe(true);
  });

  it("Should require category name", async () => {
    category.name = "";
    validator.validate(category);
    expect(validator.errors).toEqual({
      name: validator.getRequiredFieldError(),
    });
  });
});
