import { OrderedFoodService } from "@/main/ordered-food/services/orderedFood";
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

describe("Ordered Food Service", () => {
  let service: OrderedFoodService;

  beforeEach(() => {
    service = new OrderedFoodService();
  });

  it("Should trigger repository selectList on getList call", async () => {
    await service.getList({});
    expect(selectList).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectTags on getTags call", async () => {
    await service.getTags({ searchPhrase: "test", tags: ["test"] });
    expect(selectTags).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectCount on getCount call", async () => {
    await service.getCount({ searchPhrase: "test", tags: ["test"] });
    expect(selectCount).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectById on getById call", async () => {
    await service.getById(1);
    expect(selectById).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on create call", async () => {
    await service.create(new OrderedFood({}));
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update call", async () => {
    await service.update(new OrderedFood({}));
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on delete call", async () => {
    await service.delete(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });
});
