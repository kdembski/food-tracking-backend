import { WheresGenerator } from "@/queries/_shared/components/generators/wheres";
import { Field } from "@/queries/_shared/components/models/field";
import { Join } from "@/queries/_shared/components/models/join";
import { Where } from "@/queries/_shared/components/models/where";
import { SelectCountQuery } from "@/queries/_shared/models/list/selectCount";
import { SelectListQuery } from "@/queries/_shared/models/list/selectList";
import { SelectQuery } from "@/queries/_shared/models/select";
import { WhereOperators, WhereParenthesis } from "@/types/_shared/queries";

describe("List Queries", () => {
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

  const searchPhraseFields = ["field1", "field2"];

  it("Should return full select list query", async () => {
    const listConfig = {
      sortAttribute: "attr",
      sortDirection: "ASC",
      page: 1,
      size: 11,
      offset: 111,
      filters: {},
    };

    const searchPhraseWheres = new WheresGenerator().generateMultipleValues(
      ["tag1", "tag2"],
      "tags",
      WhereOperators.AND
    );
    const tagsWheres = new WheresGenerator().generateMultipleFields(
      searchPhraseFields,
      "phrase",
      WhereOperators.OR
    );

    let selectQuery = new SelectQuery(
      "tableName",
      fieldsToSelect,
      [...searchPhraseWheres, WhereOperators.AND, ...tagsWheres],
      joins
    ).query;

    expect(new SelectListQuery(selectQuery, listConfig).query).toEqual(
      "SELECT table1.name1 AS alias1, table2.name2, name3 FROM tableName JOIN joinTable1 ON joinOn1 = joinTable1.joinEquals1 LEFT JOIN joinTable2 ON joinOn2 = joinTable2.joinEquals2 WHERE tags COLLATE utf8mb4_general_ci LIKE '%tag1%' AND tags COLLATE utf8mb4_general_ci LIKE '%tag2%' AND ( field1 COLLATE utf8mb4_general_ci LIKE '%phrase%' OR field2 COLLATE utf8mb4_general_ci LIKE '%phrase%' ) ORDER BY attr ASC LIMIT 11 OFFSET 111"
    );
  });

  it("Should return simple select list query", async () => {
    const listConfig = {
      sortAttribute: "",
      sortDirection: "",
      page: 1,
      size: 11,
      offset: 111,
      filters: {},
    };

    let selectQuery = new SelectQuery("tableName", fieldsToSelect, [], joins)
      .query;

    expect(new SelectListQuery(selectQuery, listConfig).query).toEqual(
      "SELECT table1.name1 AS alias1, table2.name2, name3 FROM tableName JOIN joinTable1 ON joinOn1 = joinTable1.joinEquals1 LEFT JOIN joinTable2 ON joinOn2 = joinTable2.joinEquals2 LIMIT 11 OFFSET 111"
    );
  });

  it("Should return select count query", async () => {
    expect(new SelectCountQuery("").query).toEqual(
      "SELECT COUNT(*) FROM () AS records"
    );
  });
});
