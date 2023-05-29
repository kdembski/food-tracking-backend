import { WheresCollectionItems } from "@/types/_shared/queries";
import { FieldsCollection } from "../collections/field";
import { JoinsCollection } from "../collections/join";
import { WheresCollection } from "../collections/where";
import { Field } from "./field";
import { Join } from "./join";
import { IQueries } from "@/interfaces/_shared/queries/queries";

export class Queries implements IQueries {
  protected tableName: string;
  protected joins: Join[];
  protected fieldsToSelect: Field[];
  private fieldsToInsert: string[];
  private fieldsToUpdate: string[];

  constructor({
    tableName,
    joins,
    fieldsToSelect,
    fieldsToInsert,
    fieldsToUpdate,
  }: {
    tableName: string;
    joins?: Join[];
    fieldsToSelect?: Field[];
    fieldsToInsert: string[];
    fieldsToUpdate: string[];
  }) {
    this.tableName = tableName;
    this.joins = joins || [];
    this.fieldsToSelect = fieldsToSelect || [];
    this.fieldsToInsert = fieldsToInsert;
    this.fieldsToUpdate = fieldsToUpdate;
  }

  getSelect({
    fields,
    joins,
    wheres,
  }: {
    fields?: Field[];
    joins?: Join[];
    wheres?: WheresCollectionItems[];
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

  getSelectOptions(labelField: string) {
    return this.getSelect({
      fields: [new Field({ name: "id" }), new Field({ name: labelField })],
      joins: [],
    });
  }

  getSelectById({
    fields,
    joins,
    wheres,
    id,
  }: {
    fields?: Field[];
    joins?: Join[];
    wheres?: WheresCollectionItems[];
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
    const preparedFields = this.buildFields(fields);
    return `INSERT INTO ${this.tableName} SET ${preparedFields}`;
  }

  getUpdate(fields = this.fieldsToUpdate) {
    const preparedFields = this.buildFields(fields);
    return `UPDATE ${this.tableName} SET ${preparedFields} WHERE id = ?`;
  }

  getDelete() {
    return `DELETE FROM ${this.tableName} WHERE id = ?`;
  }

  private buildFields(fields: string[]) {
    return fields
      .reduce((accum, field) => {
        accum += field + " = ?, ";
        return accum;
      }, "")
      .slice(0, -2);
  }
}
