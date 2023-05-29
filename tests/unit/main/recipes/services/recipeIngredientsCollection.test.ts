import { RecipeIngredientsCollection } from "@/main/recipes/collections/recipeIngredients";
import { RecipeIngredientsCollectionService } from "@/main/recipes/services/recipe-ingredients-collection/recipeIngredientsCollection";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";

const selectByRecipeId = jest.fn().mockImplementation(() => [
  {
    id: 1,
    recipeId: 2,
    ingredientId: 3,
    unitId: 4,
    amount: 5,
    ingredientName: "ingredient",
    unitShortcut: "unit",
    kcalPerUnit: "12.34",
    isPrimary: false,
    converterToPrimary: 7,
  },
]);
const selectByIngredientUnitId = jest.fn().mockImplementation(() => []);

jest.mock("@/repositories/recipes/recipeIngredients", () => ({
  RecipeIngredientsRepository: jest.fn().mockImplementation(() => ({
    selectByRecipeId,
    selectByIngredientUnitId,
  })),
}));

const updateKcal = jest.fn();
jest.mock("@/main/recipes/services/recipes", () => ({
  RecipesService: jest.fn().mockImplementation(() => ({
    updateKcal,
  })),
}));

describe("Recipe Ingredients Collection Service", () => {
  let service: RecipeIngredientsCollectionService;

  beforeEach(() => {
    service = new RecipeIngredientsCollectionService();
  });

  it("Should call repository selectByRecipeId on getByRecipeId call", async () => {
    expect(await service.getByRecipeId(1)).toEqual(
      new RecipeIngredientsCollection([
        new RecipeIngredient({
          id: 1,
          recipeId: 2,
          ingredientId: 3,
          unitId: 4,
          amount: 5,
          ingredientName: "ingredient",
          unitShortcut: "unit",
          kcalPerUnit: 12.34,
          isPrimary: false,
          converterToPrimary: 7,
        }),
      ])
    );
    expect(selectByRecipeId).toHaveBeenCalledTimes(1);
  });

  it("Should call repository selectByIngredientUnitId on getByIngredientUnitId call", async () => {
    expect(await service.getByIngredientUnitId(1));
    expect(selectByIngredientUnitId).toHaveBeenCalledTimes(1);
  });

  it("Should call getByRecipeId on getCollection call", async () => {
    expect(await service.getCollection(1));
    expect(selectByRecipeId).toHaveBeenCalledTimes(1);
  });

  it("Should call getByRecipeId on getCollection call", async () => {
    expect(await service.getCollection(1));
    expect(selectByRecipeId).toHaveBeenCalledTimes(1);
  });

  it("Should calculate kcal and call updateKcal from RecipeService on callback call", async () => {
    expect(await service.callback(1));
    expect(updateKcal).toHaveBeenCalledTimes(1);
    expect(updateKcal).toHaveBeenCalledWith(12.34 * 5, 1);
  });
});
