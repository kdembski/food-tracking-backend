import {
  WhereOperators,
  WhereParenthesis,
} from "./../../../../src/types/_shared/queries";
import { Field } from "@/queries/_shared/components/models/field";
import { Join } from "@/queries/_shared/components/models/join";
import { Where } from "@/queries/_shared/components/models/where";
import { CRUDQueries } from "@/queries/_shared/crud";
import { SelectQuery } from "@/queries/_shared/models/select";

describe("CRUD Queries", () => {
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
    }),
    WhereOperators.AND,
    WhereParenthesis.LEFT,
    new Where({
      field: "field2",
      like: "like2",
    }),
    WhereOperators.OR,
    new Where({
      field: "field3",
      like: "like3",
    }),
    WhereParenthesis.RIGHT,
  ];

  const fieldsToInsert = ["field1", "field2"];
  const fieldsToUpdate = ["field1", "field2"];

  let queries: CRUDQueries;

  beforeEach(() => {
    queries = new CRUDQueries(
      "tableName",
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
      joins
    );
  });

  it("Should return select by id query", async () => {
    expect(queries.getSelectById()).toEqual(
      "SELECT table1.name1 AS alias1, table2.name2, name3 FROM tableName JOIN joinTable1 ON joinOn1 = joinTable1.joinEquals1 LEFT JOIN joinTable2 ON joinOn2 = joinTable2.joinEquals2 WHERE tableName.id = ?"
    );
  });

  it("Should return select by custom id query", async () => {
    expect(queries.getSelectById("custom_id")).toEqual(
      "SELECT table1.name1 AS alias1, table2.name2, name3 FROM tableName JOIN joinTable1 ON joinOn1 = joinTable1.joinEquals1 LEFT JOIN joinTable2 ON joinOn2 = joinTable2.joinEquals2 WHERE custom_id = ?"
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

  it("Should return select query with where clause", async () => {
    const wheres = [
      new Where({
        field: "field1",
        like: "like",
      }),
      WhereOperators.AND,
      new Where({
        field: "field2",
        between: { from: "from", to: "to" },
      }),
    ];
    expect(
      new SelectQuery("tableName", fieldsToSelect, wheres, []).query
    ).toEqual(
      "SELECT table1.name1 AS alias1, table2.name2, name3 FROM tableName WHERE field1 COLLATE utf8mb4_general_ci LIKE 'like' AND field2 BETWEEN 'from' AND 'to'"
    );
  });

  it("Should return query with where equals clause", async () => {
    const wheres = [
      new Where({
        field: "field1",
        equals: "equals1",
      }),
      WhereOperators.AND,
      new Where({
        field: "field2",
        equals: "equals2",
      }),
    ];
    expect(
      new SelectQuery("tableName", fieldsToSelect, wheres, []).query
    ).toEqual(
      "SELECT table1.name1 AS alias1, table2.name2, name3 FROM tableName WHERE field1 = equals1 AND field2 = equals2"
    );
  });
});
