import { IngredientUnitsCollection } from "@/main/ingredients/collections/ingredientUnits";
import { IngredientUnitsCollectionService } from "@/main/ingredients/services/ingredientUnitsCollection";
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

jest.mock("@/main/ingredients/services/ingredientUnits", () => ({
  IngredientUnitsService: jest.fn().mockImplementation(() => ({
    create,
    update,
    delete: _delete,
  })),
}));

describe("Ingredient Units Collection Service", () => {
  let service: IngredientUnitsCollectionService;

  beforeEach(() => {
    service = new IngredientUnitsCollectionService();
  });

  it("Should trigger repository selectByIngredientId on getByIngredientId call", async () => {
    const items = new IngredientUnitsCollectionMapper().toDTO(
      await service.getByIngredientId(1)
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

  it("Should trigger unit service create on create call", async () => {
    await service.create(undefined, 1);
    expect(create).toHaveBeenCalledTimes(0);

    await service.create(
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

  it("Should prepare units to create, update, and delete and trigger those unit service methods on update call", async () => {
    await service.update(undefined, 1);
    expect(update).toHaveBeenCalledTimes(0);
    expect(create).toHaveBeenCalledTimes(0);
    expect(_delete).toHaveBeenCalledTimes(0);

    await service.update(
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
