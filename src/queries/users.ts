import { Field } from "./_shared/components/models/field";
import { CRUDQueries } from "./_shared/crud";

export class UsersQueries extends CRUDQueries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = ["password"];
    const fieldsToUpdate = ["password"];

    super("users", fieldsToSelect, fieldsToInsert, fieldsToUpdate);
  }
}
