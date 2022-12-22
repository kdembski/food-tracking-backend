import { List } from "@/abstract/models/list";
import { ListConfig } from "@/interfaces/base/list";

class Item {
  _prop: string;

  constructor(data: { prop: string }) {
    this._prop = data.prop;
  }

  getDTO() {
    return {
      prop: this._prop,
    };
  }
}

type ItemDTO = {
  prop: string;
};

const listData = [{ prop: "test" }];

class TestList extends List<Item, ItemDTO> {
  protected getListCount(searchPhrase: string, tags: string) {
    return Promise.resolve(1);
  }

  protected getListData(config: ListConfig) {
    return Promise.resolve(listData);
  }

  createListItem(data: ItemDTO) {
    return new Item(data);
  }
}

describe("List Model", () => {
  let list: TestList;

  beforeEach(() => {
    list = new TestList();
  });

  it("Should throw error when getListDTO is called with empty data", async () => {
    expect(() => list.getListDTO()).toThrowError();
  });

  it("Should set list data and pagination", async () => {
    await list.loadList({ size: "10", page: "1" });
    expect(list).toEqual({
      data: [{ _prop: "test" }],
      pagination: {
        currentPage: 1,
        firstRecord: 1,
        lastRecord: 1,
        totalPages: 1,
        totalRecords: 1,
      },
    });
  });

  it("Should return list items dtos", async () => {
    await list.loadList({ size: "10", page: "1" });
    expect(list.getListDTO()).toEqual({
      data: [{ prop: "test" }],
      pagination: {
        currentPage: 1,
        firstRecord: 1,
        lastRecord: 1,
        totalPages: 1,
        totalRecords: 1,
      },
    });
  });

  it("Should return list data length", async () => {
    expect(list.getDataLength()).toEqual(0);
    await list.loadList({ size: "10", page: "1" });
    expect(list.getDataLength()).toEqual(1);
  });

  it("Should iterate through list data with provided callback", async () => {
    await list.loadList({ size: "10", page: "1" });

    const callback = jest.fn().mockImplementation((item: Item) => false);
    list.iterate(callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(new Item(listData[0]));
  });
});
