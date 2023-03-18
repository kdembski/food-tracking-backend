import { RecipeIngredientsCollection } from "@/main/recipes/collections/recipeIngredients";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { RecipeIngredientsCollectionValidator } from "@/main/recipes/validators/recipeIngredientsCollection";

describe("Recipe Ingredient Collection Validator", () => {
  let validator: RecipeIngredientsCollectionValidator;
  let collection: RecipeIngredientsCollection;

  beforeEach(() => {
    validator = new RecipeIngredientsCollectionValidator();

    collection = new RecipeIngredientsCollection([
      new RecipeIngredient({
        ingredientId: 1,
        unitId: 1,
        amount: 1,
      }),
      new RecipeIngredient({
        ingredientId: 1,
        unitId: 1,
        amount: 1,
      }),
    ]);
  });

  it("Should determine if errors are empty", async () => {
    await validator.validate(collection);
    expect(validator.errors?.isEmpty()).toBe(true);
  });

  it("Should validate each recipe ingredient from collection", async () => {
    collection.items[1] = new RecipeIngredient({});
    await validator.validate(collection);
    expect(validator.errors?.items?.length).toEqual(2);
    expect(validator.errors?.items?.[0].unitId).toEqual(undefined);
    expect(validator.errors?.items?.[1].unitId).toEqual(
      validator.getRequiredFieldError()
    );
  });
});
