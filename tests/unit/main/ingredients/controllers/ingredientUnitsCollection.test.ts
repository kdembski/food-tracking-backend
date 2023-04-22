import { IngredientUnitsCollection } from "@/main/ingredients/collections/ingredientUnits";
import { IngredientUnitsCollectionController } from "@/main/ingredients/controllers/ingredientUnitsCollection";
import { IngredientUnitsCollectionMapper } from "@/mappers/ingredients/ingredientUnitsCollection";

const selectByIngredientId = jest.fn().mockImplementation((id: number) => [
  {
    id: 1,
    ingredientId: id,
    unitId: 1,
    kcalPerUnit: "12.12",
    isPrimary: 1,
    converterToPrimary: "21.21",
  },
  {
    id: 2,
    ingredientId: id,
    unitId: 2,
    kcalPerUnit: "12.12",
    isPrimary: 1,
    converterToPrimary: "21.21",
  },
]);

jest.mock("@/repositories/ingredients/ingredientUnits", () => ({
  IngredientUnitsRepository: jest.fn().mockImplementation(() => ({
    selectByIngredientId,
  })),
}));

const create = jest.fn().mockImplementation(() => ({ insertId: 1 }));
const update = jest.fn();
const _delete = jest.fn();

jest.mock("@/main/ingredients/controllers/ingredientUnits", () => ({
  IngredientUnitsController: jest.fn().mockImplementation(() => ({
    create,
    update,
    delete: _delete,
  })),
}));

describe("Ingredient Units Collection Controller", () => {
  let controller: IngredientUnitsCollectionController;

  beforeEach(() => {
    controller = new IngredientUnitsCollectionController();
  });

  it("Should trigger repository selectByIngredientId on getByIngredientId call", async () => {
    const items = new IngredientUnitsCollectionMapper().toDTO(
      await controller.getByIngredientId(1)
    );
    expect(items).toEqual([
      {
        id: 1,
        ingredientId: 1,
        unitId: 1,
        kcalPerUnit: 12.12,
        isPrimary: true,
        converterToPrimary: 21.21,
        unitName: undefined,
      },
      {
        id: 2,
        ingredientId: 1,
        unitId: 2,
        kcalPerUnit: 12.12,
        isPrimary: true,
        converterToPrimary: 21.21,
        unitName: undefined,
      },
    ]);
    expect(selectByIngredientId).toHaveBeenCalledTimes(1);
  });

  it("Should trigger unit controller create on create call", async () => {
    await controller.create(undefined, 1);
    expect(create).toHaveBeenCalledTimes(0);

    await controller.create(
      new IngredientUnitsCollection([
        {
          id: 1,
          ingredientId: 1,
          unitId: 1,
          unitName: "name1",
          unitShortcut: "shortcut1",
          kcalPerUnit: 1,
          isPrimary: true,
          converterToPrimary: 1,
        },
      ]),
      1
    );
    expect(create).toHaveBeenCalledTimes(1);
  });

  it("Should prepare units to create, update, and delete and trigger those unit controller methods on update call", async () => {
    await controller.update(undefined, 1);
    expect(update).toHaveBeenCalledTimes(0);
    expect(create).toHaveBeenCalledTimes(0);
    expect(_delete).toHaveBeenCalledTimes(0);

    await controller.update(
      new IngredientUnitsCollection([
        {
          id: 2,
          ingredientId: 2,
          unitId: 2,
          unitName: "name2",
          unitShortcut: "shortcut2",
          kcalPerUnit: 2,
          isPrimary: true,
          converterToPrimary: 2,
        },
        {
          id: undefined,
          ingredientId: 3,
          unitId: 3,
          unitName: "name3",
          unitShortcut: "shortcut3",
          kcalPerUnit: 3,
          isPrimary: true,
          converterToPrimary: 3,
        },
      ]),
      1
    );
    expect(update).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledTimes(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });
});
