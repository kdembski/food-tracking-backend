import { IngredientUnitsController } from "@/main/ingredients/controllers/ingredientUnits";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";

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

  it("Should trigger repository insert on delete call", async () => {
    await controller.delete(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });
});
