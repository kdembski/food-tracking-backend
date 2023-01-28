import { Field } from "@/base/queries/models/field";
import { Queries } from "@/base/queries/queries";

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
