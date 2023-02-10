import { UnitsController } from "@/main/ingredients/controllers/units";
import { Unit } from "@/main/ingredients/models/unit";

const selectOptions = jest.fn();
const selectById = jest.fn().mockImplementation(() => ({}));
const insert = jest.fn().mockImplementation(() => ({ insertId: 1 }));
const update = jest.fn();
const _delete = jest.fn();
const selectAll = jest.fn().mockImplementation(() => [{ id: 1 }]);

jest.mock("@/repositories/ingredients/units", () => ({
  UnitsRepository: jest.fn().mockImplementation(() => ({
    selectOptions,
    selectById,
    insert,
    update,
    delete: _delete,
    selectAll,
  })),
}));

describe("Units Controller", () => {
  let controller: UnitsController;

  beforeEach(() => {
    controller = new UnitsController();
  });

  it("Should trigger repository selectList on getList call", async () => {
    await controller.getAll();
    expect(selectAll).toHaveBeenCalledTimes(1);
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
    await controller.create(new Unit({ id: 1 }));
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update call", async () => {
    await controller.update(new Unit({ id: 1 }));
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on delete call", async () => {
    await controller.delete(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });
});
