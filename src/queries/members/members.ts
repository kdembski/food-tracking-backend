import { Field } from "../_shared/components/models/field";
import { CRUDQueries } from "../_shared/crud";
import { SelectQuery } from "../_shared/models/select";

export class MembersQueries extends CRUDQueries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = ["name"];
    const fieldsToUpdate = ["name"];

    super("members", fieldsToSelect, fieldsToInsert, fieldsToUpdate);
  }

  getSelectAll() {
    return new SelectQuery(this.tableName, this.fieldsToSelect).query;
  }
}
