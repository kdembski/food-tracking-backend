import { OrderedFoodController } from "@/controllers/orderedFood";

const selectCount = jest.fn();
const selectById = jest.fn().mockImplementation(() => ({}));
const insert = jest.fn();
const update = jest.fn();
const _delete = jest.fn();

jest.mock("@/repositories/orderedFood", () => ({
  OrderedFoodRepository: jest.fn().mockImplementation(() => ({
    selectCount,
    selectById,
    insert,
    update,
    delete: _delete,
  })),
}));

const loadList = jest.fn();
jest.mock("@/models/ordered-food/orderedFoodList", () => ({
  OrderedFoodList: jest.fn().mockImplementation(() => ({
    loadList,
  })),
}));

const loadTags = jest.fn();
jest.mock("@/models/ordered-food/orderedFoodTags", () => ({
  OrderedFoodTags: jest.fn().mockImplementation(() => ({
    loadTags,
  })),
}));

describe("Ordered Food Controller", () => {
  let controller: OrderedFoodController;

  beforeEach(() => {
    controller = new OrderedFoodController();
  });

  it("Should trigger loadList from recipesList on getList call", async () => {
    await controller.getList({});
    expect(loadList).toHaveBeenCalledTimes(1);
  });

  it("Should trigger loadTags from recipesTags on getTags call", async () => {
    await controller.getTags({});
    expect(loadTags).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectCount on getCount call", async () => {
    await controller.getCount("");
    expect(selectCount).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectById on getById call", async () => {
    await controller.getById(1);
    expect(selectById).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on create call", async () => {
    await controller.create({});
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update call", async () => {
    await controller.update({});
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on delete call", async () => {
    await controller.delete(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });
});
