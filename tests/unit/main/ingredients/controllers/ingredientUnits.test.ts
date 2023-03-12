import { RecipeIngredientsCollection } from "@/main/recipes/collections/recipeIngredients";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { IngredientUnitsController } from "@/main/ingredients/controllers/ingredientUnits";
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
jest.mock("@/main/recipes/controllers/recipeIngredientsCollection", () => ({
  RecipeIngredientsCollectionController: jest.fn().mockImplementation(() => ({
    getByIngredientUnitId,
    getByRecipeId,
  })),
}));

const updateKcal = jest.fn();
jest.mock("@/main/recipes/controllers/recipes", () => ({
  RecipesController: jest.fn().mockImplementation(() => ({
    updateKcal,
  })),
}));

describe("Ingredient Units Controller", () => {
  let controller: IngredientUnitsController;

  beforeEach(() => {
    controller = new IngredientUnitsController();
  });

  it("Should trigger repository selectById on getById call", async () => {
    await controller.getById(1);
    expect(selectById).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on create call", async () => {
    await controller.create(new IngredientUnit({ id: 1 }));
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update call", async () => {
    await controller.update(new IngredientUnit({ id: 1 }));
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("Should update kcal in linked recipes on update call", async () => {
    await controller.update(new IngredientUnit({}));
    expect(getByIngredientUnitId).toHaveBeenCalledTimes(0);

    await controller.update(new IngredientUnit({ id: 1 }));
    await flushPromises();
    expect(updateKcal).toHaveBeenCalledTimes(2);
    expect(updateKcal).toHaveBeenCalledWith(40, 1);
    expect(updateKcal).toHaveBeenCalledWith(40, 2);
  });

  it("Should trigger repository insert on delete call", async () => {
    await controller.delete(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });
});
