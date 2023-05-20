import { RecipeIngredientsCollection } from "@/main/recipes/collections/recipeIngredients";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { IngredientUnitsService } from "@/main/ingredients/services/ingredientUnits";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";
import flushPromises from "flush-promises";

const selectById = jest.fn().mockImplementation(() => ({}));
const insert = jest.fn().mockImplementation(() => ({ insertId: 1 }));
const update = jest.fn();
const _delete = jest.fn();

jest.mock("@/repositories/ingredients/ingredientUnits", () => ({
  IngredientUnitsRepository: jest.fn().mockImplementation(() => ({
    selectById,
    insert,
    update,
    delete: _delete,
  })),
}));

const getByIngredientUnitId = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve(
      new RecipeIngredientsCollection([
        new RecipeIngredient({ recipeId: 1 }),
        new RecipeIngredient({ recipeId: 2 }),
        new RecipeIngredient({}),
      ])
    )
  );
const getByRecipeId = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve(
      new RecipeIngredientsCollection([
        new RecipeIngredient({ amount: 10, kcalPerUnit: 2 }),
        new RecipeIngredient({ amount: 10, kcalPerUnit: 2 }),
      ])
    )
  );
jest.mock("@/main/recipes/services/recipeIngredientsCollection", () => ({
  RecipeIngredientsCollectionService: jest.fn().mockImplementation(() => ({
    getByIngredientUnitId,
    getByRecipeId,
  })),
}));

const updateKcal = jest.fn();
jest.mock("@/main/recipes/services/recipes", () => ({
  RecipesService: jest.fn().mockImplementation(() => ({
    updateKcal,
  })),
}));

describe("Ingredient Units Service", () => {
  let service: IngredientUnitsService;

  beforeEach(() => {
    service = new IngredientUnitsService();
  });

  it("Should trigger repository selectById on getById call", async () => {
    await service.getById(1);
    expect(selectById).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on create call", async () => {
    await service.create(new IngredientUnit({ id: 1 }));
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update call", async () => {
    await service.update(new IngredientUnit({ id: 1 }));
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("Should update kcal in linked recipes on update call", async () => {
    await service.update(new IngredientUnit({}));
    expect(getByIngredientUnitId).toHaveBeenCalledTimes(0);

    await service.update(new IngredientUnit({ id: 1 }));
    await flushPromises();
    expect(updateKcal).toHaveBeenCalledTimes(2);
    expect(updateKcal).toHaveBeenCalledWith(40, 1);
    expect(updateKcal).toHaveBeenCalledWith(40, 2);
  });

  it("Should trigger repository insert on delete call", async () => {
    await service.delete(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });
});
