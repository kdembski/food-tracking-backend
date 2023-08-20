import { ListRepository } from "@/repositories/_shared/list";

class TestListRepositiory extends ListRepository<{}, {}> {
  getFieldsToInsert() {
    return [];
  }
  getFieldsToUpdate() {
    return [];
  }
}

const queries = {
  getSelectList: jest.fn().mockImplementation(() => "select list"),
  getSelectCount: jest.fn().mockImplementation(() => "select count"),
} as any;

const database = {
  sendQuery: jest.fn(),
} as any;

describe("List Repositories", () => {
  let repositiory: TestListRepositiory;

  beforeEach(() => {
    repositiory = new TestListRepositiory(database, queries);
  });

  it("Should send correct query on selectList call", async () => {
    const config = {
      sortAttribute: "attr",
      sortDirection: "ASC",
      page: 1,
      size: 11,
      offset: 111,
      filters: {},
    };

    database.sendQuery.mockImplementationOnce(() => ["test"]);
    await repositiory.selectList(config);
    expect(database.sendQuery).toHaveBeenLastCalledWith("select list");
  });

  it("Should send correct query on selectCount call", async () => {
    database.sendQuery.mockImplementationOnce(() => [{}]);
    await repositiory.selectCount({});
    expect(database.sendQuery).toHaveBeenLastCalledWith("select count");
  });
});
