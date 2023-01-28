import { Field } from "@/base/queries/models/field";
import { Join } from "@/base/queries/models/join";
import { Where } from "@/base/queries/models/where";
import { Queries } from "@/base/queries/queries";

describe("Queries", () => {
  const joins = [
    new Join({
      table: "joinTable1",
      on: "joinOn1",
      equals: "joinEquals1",
    }),
    new Join({
      type: "LEFT JOIN",
      table: "joinTable2",
      on: "joinOn2",
      equals: "joinEquals2",
    }),
  ];

  const fieldsToSelect = [
    new Field({
      table: "table1",
      name: "name1",
      alias: "alias1",
    }),
    new Field({
      table: "table2",
      name: "name2",
    }),
    new Field({
      name: "name3",
    }),
  ];

  const wheres = [
    new Where({
      field: "field1",
      like: "like1",
      operator: "AND",
    }),
    new Where({
      field: "field2",
      like: "like2",
      operator: "AND",
    }),
    new Where({
      field: "field3",
      like: "like3",
      operator: "OR",
    }),
  ];

  const fieldsToInsert = ["field1", "field2"];
  const fieldsToUpdate = ["field1", "field2"];
  const searchPhraseFields = ["field1", "field2"];

  let queries: Queries;

  beforeEach(() => {
    queries = new Queries({
      tableName: "tableName",
      joins,
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
      searchPhraseFields,
    });
  });

  it("Should return select query", async () => {
    expect(queries.getSelect({ wheres })).toEqual(
      "SELECT table1.name1 AS alias1, table2.name2, name3 FROM tableName JOIN joinTable1 ON joinOn1 = joinTable1.joinEquals1 LEFT JOIN joinTable2 ON joinOn2 = joinTable2.joinEquals2 WHERE (field1 COLLATE utf8mb4_general_ci LIKE 'like1' AND field2 COLLATE utf8mb4_general_ci LIKE 'like2') OR field3 COLLATE utf8mb4_general_ci LIKE 'like3'"
    );
  });

  it("Should return full select list query", async () => {
    expect(
      queries.getSelectList({
        sortAttribute: "attr",
        sortDirection: "ASC",
        page: 1,
        size: 11,
        offset: 111,
        tags: "tag1,tag2",
        searchPhrase: "phrase",
      })
    ).toEqual(
      "SELECT table1.name1 AS alias1, table2.name2, name3 FROM tableName JOIN joinTable1 ON joinOn1 = joinTable1.joinEquals1 LEFT JOIN joinTable2 ON joinOn2 = joinTable2.joinEquals2 WHERE (tags COLLATE utf8mb4_general_ci LIKE '%tag1%' AND tags COLLATE utf8mb4_general_ci LIKE '%tag2%') OR field1 COLLATE utf8mb4_general_ci LIKE '%phrase%' OR field2 COLLATE utf8mb4_general_ci LIKE '%phrase%' ORDER BY attr ASC LIMIT 11 OFFSET 111"
    );
  });

  it("Should return simple select list query", async () => {
    expect(
      queries.getSelectList({
        sortAttribute: "",
        sortDirection: "",
        page: 1,
        size: 11,
        offset: 111,
        tags: "",
        searchPhrase: "",
      })
    ).toEqual(
      "SELECT table1.name1 AS alias1, table2.name2, name3 FROM tableName JOIN joinTable1 ON joinOn1 = joinTable1.joinEquals1 LEFT JOIN joinTable2 ON joinOn2 = joinTable2.joinEquals2 LIMIT 11 OFFSET 111"
    );
  });

  it("Should return select count query", async () => {
    expect(queries.getSelectCount("", "")).toEqual(
      "SELECT COUNT(*) FROM tableName"
    );
  });

  it("Should return select options query", async () => {
    expect(queries.getSelectOptions("labelField")).toEqual(
      "SELECT id, labelField FROM tableName"
    );
  });

  it("Should return insert query", async () => {
    expect(queries.getInsert()).toEqual(
      "INSERT INTO tableName SET field1 = ?, field2 = ?"
    );
  });

  it("Should return update query", async () => {
    expect(queries.getUpdate()).toEqual(
      "UPDATE tableName SET field1 = ?, field2 = ? WHERE id = ?"
    );
  });

  it("Should return delete query", async () => {
    expect(queries.getDelete()).toEqual("DELETE FROM tableName WHERE id = ?");
  });

  it("Should return select by id query", async () => {
    expect(queries.getSelectById({ joins: [] })).toEqual(
      "SELECT table1.name1 AS alias1, table2.name2, name3 FROM tableName WHERE tableName.id = ?"
    );
  });

  it("Should return select by id with where clause query", async () => {
    const wheres = [
      new Where({
        field: "field1",
        like: "like",
        operator: "AND",
      }),
      new Where({
        field: "field2",
        between: { from: "from", to: "to" },
        operator: "AND",
      }),
    ];
    expect(queries.getSelectById({ joins: [], wheres })).toEqual(
      "SELECT table1.name1 AS alias1, table2.name2, name3 FROM tableName WHERE field1 COLLATE utf8mb4_general_ci LIKE 'like' AND field2 COLLATE utf8mb4_general_ci BETWEEN 'from' AND 'to' AND tableName.id = ?"
    );
  });

  it("Should return select by custom id query", async () => {
    expect(queries.getSelectById({ joins: [], id: "custom_id" })).toEqual(
      "SELECT table1.name1 AS alias1, table2.name2, name3 FROM tableName WHERE tableName.custom_id = ?"
    );
  });
});
