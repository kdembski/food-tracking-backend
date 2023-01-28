import { Queries } from "@/base/queries/queries";
import { Field } from "@/base/queries/models/field";

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
