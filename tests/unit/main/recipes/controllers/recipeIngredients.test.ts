import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { RecipeIngredientsController } from "@/main/recipes/controllers/recipeIngredients";

const selectById = jest.fn().mockImplementation(() => ({
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
}));
const insert = jest.fn();
const update = jest.fn();
const _delete = jest.fn();

jest.mock("@/repositories/recipes/recipeIngredients", () => ({
  RecipeIngredientsRepository: jest.fn().mockImplementation(() => ({
    selectById,
    insert,
    update,
    delete: _delete,
  })),
}));

const getByIngredientIdAndUnitId = jest
  .fn()
  .mockImplementation(() => ({ id: 3 }));
jest.mock("@/main/ingredients/controllers/ingredientUnits", () => ({
  IngredientUnitsController: jest.fn().mockImplementation(() => ({
    getByIngredientIdAndUnitId,
  })),
}));

describe("Recipe Ingredients Controller", () => {
  let controller: RecipeIngredientsController;

  beforeEach(() => {
    controller = new RecipeIngredientsController();
  });

  it("Should return recipeIngredient on getById call", async () => {
    expect(await controller.getById(1)).toEqual(
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
      })
    );
    expect(selectById).toHaveBeenCalledTimes(1);
  });

  it("Should call repository insert on create call", async () => {
    expect(
      await controller.create(
        new RecipeIngredient({
          ingredientId: 1,
          unitId: 2,
        })
      )
    );
    expect(getByIngredientIdAndUnitId).toHaveBeenCalledWith(1, 2);
    expect(insert).toHaveBeenCalledTimes(1);
    expect(insert).toHaveBeenCalledWith(
      new RecipeIngredient({
        ingredientId: 1,
        unitId: 2,
        ingredientUnitId: 3,
      })
    );
  });

  it("Should call repository update on update call", async () => {
    expect(
      await controller.update(
        new RecipeIngredient({
          ingredientId: 1,
          unitId: 2,
        })
      )
    );
    expect(getByIngredientIdAndUnitId).toHaveBeenCalledWith(1, 2);
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(
      new RecipeIngredient({
        ingredientId: 1,
        unitId: 2,
        ingredientUnitId: 3,
      })
    );
  });

  it("Should call repository delete on delete call", async () => {
    expect(await controller.delete(1));
    expect(_delete).toHaveBeenCalledTimes(1);
  });
});
