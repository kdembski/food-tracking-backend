import { IngredientCategoriesService } from "@/main/ingredients/services/ingredientCategories";
import { IngredientCategory } from "@/main/ingredients/models/ingredientCategory";

const selectOptions = jest.fn();
const selectById = jest.fn().mockImplementation(() => ({}));
const insert = jest.fn().mockImplementation(() => ({ insertId: 1 }));
const update = jest.fn();
const _delete = jest.fn();
const selectAll = jest.fn().mockImplementation(() => [{ id: 1 }]);
const selectList = jest.fn().mockImplementation(() => [{ id: 1 }]);
const selectCount = jest.fn().mockImplementation(() => 1);

jest.mock("@/repositories/ingredients/ingredientCategories", () => ({
  IngredientCategoriesRepository: jest.fn().mockImplementation(() => ({
    selectOptions,
    selectById,
    insert,
    update,
    delete: _delete,
    selectAll,
    selectList,
    selectCount,
  })),
}));

describe("IngredientCategories Service", () => {
  let service: IngredientCategoriesService;

  beforeEach(() => {
    service = new IngredientCategoriesService();
  });

  it("Should trigger repository selectList on getList call", async () => {
    await service.getList({});
    expect(selectList).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectOptions on getOptions call", async () => {
    await service.getOptions();
    expect(selectOptions).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectById on getById call", async () => {
    await service.getById(1);
    expect(selectById).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on create call", async () => {
    await service.create(new IngredientCategory({ id: 1 }));
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update call", async () => {
    await service.update(new IngredientCategory({ id: 1 }));
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on delete call", async () => {
    await service.delete(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });
});
