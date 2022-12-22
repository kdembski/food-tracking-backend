import { DatabaseQueryHelper } from "@/helpers/databaseQuery";

describe("Database Query Helper", () => {
  let helper: DatabaseQueryHelper;

  beforeEach(() => {
    helper = new DatabaseQueryHelper();
  });

  it("Should return db query for provided tags", async () => {
    expect(helper.getQueryToFiltersByTags("")).toEqual("");
    expect(helper.getQueryToFiltersByTags("tag1,tag2")).toEqual(
      "AND tags COLLATE utf8mb4_general_ci LIKE '%tag1%'\nAND tags COLLATE utf8mb4_general_ci LIKE '%tag2%'\n"
    );
  });

  it("Should return db query for provided sort attribute and direction", async () => {
    expect(helper.getQueryToOrderBy()).toEqual("");
    expect(helper.getQueryToOrderBy("attr", "dir")).toEqual(
      "ORDER BY attr dir\n"
    );
  });

  it("Should extend list query based on provided config", async () => {
    expect(
      helper.extendQueryToSelectList("query", {
        sortAttribute: "attr",
        sortDirection: "dir",
        tags: "tag",
        size: 10,
        offset: 10,
      })
    ).toEqual(
      "query\nAND tags COLLATE utf8mb4_general_ci LIKE '%tag%'\nORDER BY attr dir\nLIMIT 10\nOFFSET 10"
    );
  });
});
