import { Field } from "./_shared/models/field";
import { Queries } from "./_shared/models/queries";

export class UsersQueries extends Queries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = ["password"];
    const fieldsToUpdate = ["password"];

    super({
      tableName: "users",
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
    });
  }
}
