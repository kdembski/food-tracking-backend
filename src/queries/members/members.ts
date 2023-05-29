import { Field } from "../_shared/models/field";
import { Queries } from "../_shared/models/queries";

export class MembersQueries extends Queries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = ["name"];
    const fieldsToUpdate = ["name"];

    super({
      tableName: "members",
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
    });
  }
}
