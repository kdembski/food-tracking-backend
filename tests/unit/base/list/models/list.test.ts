import { ListBuilder } from "@/base/list/builders/list";
import { List } from "@/base/list/models/list";
import { ListConfig } from "@/types/base/list";

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

class TestRepository {
  selectCount(searchPhrase: string, tags?: string) {
    return Promise.resolve(1);
  }

  selectList(config: ListConfig) {
    return Promise.resolve(listData);
  }
}

class TestList extends List<Item, ItemDTO> {
  constructor() {
    super(new TestRepository());
  }

  createListItem(data: ItemDTO) {
    return new Item(data);
  }
}

describe("List Model", () => {
  let list: TestList;
  let builder: ListBuilder<Item, ItemDTO>;

  beforeEach(() => {
    list = new TestList();
    builder = new ListBuilder(list);
  });

  it("Should throw error when try to get empty data", async () => {
    expect(() => list.data).toThrowError();
  });

  it("Should throw error when try to get empty pagination", async () => {
    expect(() => list.pagination).toThrowError();
  });

  it("Should return list items dtos", async () => {
    await builder.build({ size: "10", page: "1" });
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
    await builder.build({ size: "10", page: "1" });
    expect(list.getDataLength()).toEqual(1);
  });
});
