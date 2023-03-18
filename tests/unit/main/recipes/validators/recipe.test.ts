import { Recipe } from "@/main/recipes/models/recipe";
import { RecipeValidator } from "@/main/recipes/validators/recipe";

describe("Recipe Validator", () => {
  let validator: RecipeValidator;
  let recipe: Recipe;

  beforeEach(() => {
    validator = new RecipeValidator();

    recipe = new Recipe({
      id: 1,
      recipeName: "name",
      preparationTime: 20,
    });
  });

  it("Should determine if errors are empty", async () => {
    validator.validate(recipe);
    expect(validator.errors?.isEmpty()).toBe(true);
  });

  it("Should require recipe name", async () => {
    recipe.recipeName = "";
    validator.validate(recipe);
    expect(validator.errors).toEqual({
      recipeName: validator.getRequiredFieldError(),
      preparationTime: undefined,
    });
  });

  it("Should require preparation time", async () => {
    recipe.preparationTime = undefined;
    validator.validate(recipe);
    expect(validator.errors).toEqual({
      recipeName: undefined,
      preparationTime: validator.getRequiredFieldError(),
    });
  });
});
