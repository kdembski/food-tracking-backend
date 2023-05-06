import { OrderedFoodController } from "@/main/ordered-food/controllers/orderedFood";
import { OrderedFood } from "@/main/ordered-food/models/orderedFood";

const selectCount = jest.fn();
const selectById = jest.fn().mockImplementation(() => ({}));
const insert = jest.fn();
const update = jest.fn();
const _delete = jest.fn();
const selectList = jest.fn().mockImplementation(() => [{ id: 1 }]);
const selectTags = jest.fn().mockImplementation(() => ["tag1,tag2"]);

jest.mock("@/repositories/orderedFood", () => ({
  OrderedFoodRepository: jest.fn().mockImplementation(() => ({
    selectCount,
    selectById,
    insert,
    update,
    delete: _delete,
    selectList,
    selectTags,
  })),
}));

describe("Ordered Food Controller", () => {
  let controller: OrderedFoodController;

  beforeEach(() => {
    controller = new OrderedFoodController();
  });

  it("Should trigger repository selectList on getList call", async () => {
    await controller.getList({});
    expect(selectList).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectTags on getTags call", async () => {
    await controller.getTags({ searchPhrase: "test", tags: ["test"] });
    expect(selectTags).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectCount on getCount call", async () => {
    await controller.getCount({ searchPhrase: "test", tags: ["test"] });
    expect(selectCount).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectById on getById call", async () => {
    await controller.getById(1);
    expect(selectById).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on create call", async () => {
    await controller.create(new OrderedFood({}));
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update call", async () => {
    await controller.update(new OrderedFood({}));
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on delete call", async () => {
    await controller.delete(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });
});
