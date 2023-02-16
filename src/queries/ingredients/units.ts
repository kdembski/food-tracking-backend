import { Queries } from "@/base/queries/queries";
import { Field } from "@/base/queries/models/field";

export class UnitsQueries extends Queries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = ["name", "shortcut"];
    const fieldsToUpdate = ["name", "shortcut"];

    super({
      tableName: "units",
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
      searchPhraseFields: ["name"],
    });
  }
}
