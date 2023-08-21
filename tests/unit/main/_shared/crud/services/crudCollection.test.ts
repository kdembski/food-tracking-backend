import { IDbEntityCollection } from "@/interfaces/_shared/db-entity/dbEntityCollection";
import { CRUDCollectionService } from "@/main/_shared/crud/services/crudCollection";

interface Item {
  id: number | undefined;
}

class TestService extends CRUDCollectionService<
  Item,
  IDbEntityCollection<Item>
> {
  getCollection = jest.fn().mockImplementation(() => ({
    items: [],
  }));
  setSelectorId = jest.fn();
}

const itemService = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

describe("CRUD Collection Service", () => {
  let service: TestService;

  beforeEach(() => {
    service = new TestService(itemService);
  });

  it("Should stop update execution if newCollection or selectorId not exists", async () => {
    await service.update(undefined, 1);
    expect(service.getCollection).toHaveBeenCalledTimes(0);

    const collection = { items: [{ id: 1 }] };
    await service.update(collection, undefined);
    expect(service.getCollection).toHaveBeenCalledTimes(0);
  });

  it("Should create every new item and update every existing item on update call", async () => {
    const collection = {
      items: [
        { id: undefined, test: "test1" },
        { id: 1, test: "test2" },
      ],
    };
    await service.update(collection, 1);
    expect(itemService.create).toHaveBeenCalledWith({
      id: undefined,
      test: "test1",
    });
    expect(itemService.update).toHaveBeenCalledWith({ id: 1, test: "test2" });
  });

  it("Should delete items that not exists in new collection but exists in old one", async () => {
    const newCollection = {
      items: [{ id: 1, test: "test1" }],
    };
    const oldCollection = {
      items: [
        { id: 2, test: "test2" },
        { id: undefined, test: "test3" },
      ],
    };
    service.getCollection.mockImplementationOnce(() => oldCollection);
    await service.update(newCollection, 1);
    expect(itemService.delete).toHaveBeenCalledWith(2);
    expect(itemService.update).toHaveBeenCalledWith({ id: 1, test: "test1" });
  });

  it("Should create all items from collection on create call", async () => {
    await service.create(undefined, 1);

    const collection = {
      items: [
        { id: 1, test: "test1" },
        { id: 2, test: "test2" },
      ],
    };
    await service.create(collection, 1);
    expect(itemService.create).toHaveBeenCalledWith({ id: 1, test: "test1" });
    expect(itemService.create).toHaveBeenCalledWith({ id: 2, test: "test2" });
  });
});
