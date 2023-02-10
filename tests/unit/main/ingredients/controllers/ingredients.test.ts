import { IngredientUnitsCollection } from "@/main/ingredients/collections/ingredientUnits";
import { IngredientsController } from "@/main/ingredients/controllers/ingredients";
import { Ingredient } from "@/main/ingredients/models/ingredient";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";

const selectOptions = jest.fn();
const selectCount = jest.fn().mockImplementation(() => 10);
const selectById = jest.fn().mockImplementation(() => ({}));
const insert = jest.fn().mockImplementation(() => ({ insertId: 1 }));
const update = jest.fn();
const _delete = jest.fn();
const selectList = jest.fn().mockImplementation(() => [{ id: 1 }]);

jest.mock("@/repositories/ingredients/ingredients", () => ({
  IngredientsRepository: jest.fn().mockImplementation(() => ({
    selectOptions,
    selectCount,
    selectById,
    insert,
    update,
    delete: _delete,
    selectList,
  })),
}));

const units = [
  new IngredientUnit({ id: 1, ingredientId: 1, unitId: 1, unitName: "name1" }),
  new IngredientUnit({ id: 2, ingredientId: 1, unitId: 2, unitName: "name2" }),
];
const getByIngredientId = jest
  .fn()
  .mockImplementation(() => new IngredientUnitsCollection(units));
const unitsCollectionCreate = jest.fn();
const unitsCollectionUpdate = jest.fn();
jest.mock("@/main/ingredients/controllers/ingredientUnitsCollection", () => ({
  IngredientUnitsCollectionController: jest.fn().mockImplementation(() => ({
    getByIngredientId,
    create: unitsCollectionCreate,
    update: unitsCollectionUpdate,
  })),
}));

describe("Ingredients Controller", () => {
  let controller: IngredientsController;

  beforeEach(() => {
    controller = new IngredientsController();
  });

  it("Should trigger repository selectList on getList call", async () => {
    expect((await controller.getList({})).toDTO()).toEqual({
      data: [
        {
          categoryId: undefined,
          categoryName: undefined,
          id: 1,
          name: undefined,
          unitNames: ["name1", "name2"],
        },
      ],
      pagination: {
        currentPage: 1,
        firstRecord: 1,
        lastRecord: 1,
        totalPages: 1,
        totalRecords: 10,
      },
    });
    expect(selectList).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectCount on getCount call", async () => {
    await controller.getCount("", "");
    expect(selectCount).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectOptions on getOptions call", async () => {
    await controller.getOptions();
    expect(selectOptions).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectById on getById call", async () => {
    await controller.getById(1);
    expect(selectById).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on create call", async () => {
    await controller.create(
      new Ingredient({ id: 1, name: "name", categoryId: 1 })
    );
    expect(insert).toHaveBeenCalledTimes(1);
    expect(unitsCollectionCreate).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update call", async () => {
    await controller.update(
      new Ingredient({ id: 1, name: "name", categoryId: 1 })
    );
    expect(update).toHaveBeenCalledTimes(1);
    expect(unitsCollectionUpdate).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on delete call", async () => {
    await controller.delete(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });
});
