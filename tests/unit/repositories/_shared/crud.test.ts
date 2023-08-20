import { CRUDRepository } from "@/repositories/_shared/crud";

class TestRepositiory extends CRUDRepository<{}, {}> {
  getFieldsToInsert() {
    return [];
  }
  getFieldsToUpdate() {
    return [];
  }
}

const queries = {
  getSelectById: jest.fn().mockImplementation(() => "select by id"),
  getInsert: jest.fn().mockImplementation(() => "insert"),
  getUpdate: jest.fn().mockImplementation(() => "update"),
  getDelete: jest.fn().mockImplementation(() => "delete"),
} as any;

const database = {
  sendQuery: jest.fn(),
} as any;

describe("CRUD Repositories", () => {
  let repositiory: TestRepositiory;

  beforeEach(() => {
    repositiory = new TestRepositiory(database, queries);
  });

  it("Should send correct query on selectById call", async () => {
    database.sendQuery.mockImplementationOnce(() => ["test"]);
    await repositiory.selectById(1);
    expect(database.sendQuery).toHaveBeenLastCalledWith("select by id", [1]);
  });

  it("Should send correct query on insert call", async () => {
    await repositiory.insert({});
    expect(database.sendQuery).toHaveBeenLastCalledWith("insert", []);
  });

  it("Should send correct query on update call", async () => {
    await repositiory.update({});
    expect(database.sendQuery).toHaveBeenLastCalledWith("update", []);
  });

  it("Should send correct query on delete call", async () => {
    await repositiory.delete(1);
    expect(database.sendQuery).toHaveBeenLastCalledWith("delete", [1]);
  });
});
