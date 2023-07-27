import { Field } from "./components/models/field";
import { Join } from "./components/models/join";
import { Where } from "./components/models/where";
import { DeleteQuery } from "./models/crud/delete";
import { InsertQuery } from "./models/crud/insert";
import { SelectByIdQuery } from "./models/crud/selectById";
import { UpdateQuery } from "./models/crud/update";

export class CRUDQueries {
  protected tableName: string;
  protected fieldsToSelect: Field[];
  protected fieldsToInsert: string[];
  protected fieldsToUpdate: string[];
  protected joins?: Join[];

  constructor(
    tableName: string,
    fieldsToSelect: Field[],
    fieldsToInsert: string[],
    fieldsToUpdate: string[],
    joins?: Join[]
  ) {
    this.tableName = tableName;
    this.fieldsToSelect = fieldsToSelect;
    this.fieldsToInsert = fieldsToInsert;
    this.fieldsToUpdate = fieldsToUpdate;
    this.joins = joins;
  }

  getSelectById(selector = "id") {
    return new SelectByIdQuery(
      this.tableName,
      selector,
      this.fieldsToSelect,
      [],
      this.joins
    ).query;
  }

  getInsert() {
    return new InsertQuery(this.tableName, this.fieldsToInsert).query;
  }

  getUpdate() {
    return new UpdateQuery(this.tableName, this.fieldsToUpdate, [
      new Where({ field: "id", equals: "?" }),
    ]).query;
  }

  getDelete() {
    return new DeleteQuery(this.tableName, [
      new Where({ field: "id", equals: "?" }),
    ]).query;
  }
}
