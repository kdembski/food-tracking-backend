import { ListConfig } from "@/types/base/list";
import { FieldsCollection } from "./collections/field";
import { JoinsCollection } from "./collections/join";
import { WheresCollection } from "./collections/where";
import { ListQueryHelper } from "./helpers/list";
import { Field } from "./models/field";
import { Join } from "./models/join";
import { Where } from "./models/where";

export class Queries {
  private tableName: string;
  protected joins: Join[];
  protected fieldsToSelect: Field[];
  private fieldsToInsert: string[];
  private fieldsToUpdate: string[];
  private searchPhraseFields: string[];
  protected listHelper: ListQueryHelper;

  constructor({
    tableName,
    joins,
    fieldsToSelect,
    fieldsToInsert,
    fieldsToUpdate,
    searchPhraseFields,
  }: {
    tableName: string;
    joins?: Join[];
    fieldsToSelect?: Field[];
    fieldsToInsert: string[];
    fieldsToUpdate: string[];
    searchPhraseFields?: string[];
  }) {
    this.tableName = tableName;
    this.joins = joins || [];
    this.fieldsToSelect = fieldsToSelect || [];
    this.fieldsToInsert = fieldsToInsert;
    this.fieldsToUpdate = fieldsToUpdate;
    this.searchPhraseFields = searchPhraseFields || [];
    this.listHelper = new ListQueryHelper(this.searchPhraseFields);
  }

  getSelectList(config: ListConfig) {
    const { sortAttribute, sortDirection, tags, size, offset, searchPhrase } =
      config;

    const wheres = this.listHelper.buildListWheres(searchPhrase, tags);
    const select = this.getSelect({ wheres });

    let orderBy = this.listHelper.buildOrderBy(sortAttribute, sortDirection);
    orderBy = orderBy ? " " + orderBy : "";

    return `${select}${orderBy} LIMIT ${size} OFFSET ${offset}`;
  }

  getSelectCount(searchPhrase: string, tags: string) {
    const wheres = this.listHelper.buildListWheres(searchPhrase, tags);

    return this.getSelect({
      fields: [new Field({ name: "COUNT(*)" })],
      joins: [],
      wheres,
    });
  }

  getSelectOptions(labelField: string) {
    return this.getSelect({
      fields: [new Field({ name: "id" }), new Field({ name: labelField })],
      joins: [],
    });
  }

  getSelect({
    fields,
    joins,
    wheres,
  }: {
    fields?: Field[];
    joins?: Join[];
    wheres?: Where[];
  } = {}) {
    fields = fields || this.fieldsToSelect;
    joins = joins || this.joins;

    const preparedFields = new FieldsCollection(fields).prepare();
    let preparedJoins = new JoinsCollection(joins).prepare();
    let preparedWheres = new WheresCollection(wheres).prepare();

    preparedJoins = preparedJoins ? " " + preparedJoins : "";
    preparedWheres = preparedWheres ? " " + preparedWheres : "";

    return `SELECT ${preparedFields} FROM ${
      this.tableName + preparedJoins + preparedWheres
    }`;
  }

  getSelectById({
    fields,
    joins,
    wheres,
    id,
  }: {
    fields?: Field[];
    joins?: Join[];
    wheres?: Where[];
    id?: string;
  } = {}) {
    fields = fields || this.fieldsToSelect;
    joins = joins || this.joins;
    id = id || "id";

    const preparedFields = new FieldsCollection(fields).prepare();
    let preparedJoins = new JoinsCollection(joins).prepare();
    let preparedWheres = new WheresCollection(wheres).prepare();

    preparedJoins = preparedJoins ? " " + preparedJoins : "";
    preparedWheres = preparedWheres
      ? ` ${preparedWheres} AND ${this.tableName}.${id} = ?`
      : ` WHERE ${this.tableName}.${id} = ?`;

    return `SELECT ${preparedFields} FROM ${
      this.tableName + preparedJoins + preparedWheres
    }`;
  }

  getInsert(fields = this.fieldsToInsert) {
    const preparedFields = this.buildFieldsToInsert(fields);
    return `INSERT INTO ${this.tableName} SET ${preparedFields}`;
  }

  getUpdate(fields = this.fieldsToUpdate) {
    const preparedFields = this.buildFieldsToInsert(fields);
    return `UPDATE ${this.tableName} SET ${preparedFields} WHERE id = ?`;
  }

  getDelete() {
    return `DELETE FROM ${this.tableName} WHERE id = ?`;
  }

  private buildFieldsToInsert(fields: string[]) {
    return fields
      .reduce((accum, field) => {
        accum += field + " = ?, ";
        return accum;
      }, "")
      .slice(0, -2);
  }
}
