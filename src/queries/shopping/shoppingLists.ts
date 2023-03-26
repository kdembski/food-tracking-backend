import { Field } from "@/base/queries/models/field";
import { Queries } from "@/base/queries/queries";

export class ShoppingListsQueries extends Queries {
  constructor() {
    super({
      tableName: "shopping_lists",
      fieldsToSelect: [new Field({ name: "*" })],
      fieldsToInsert: ["name"],
      fieldsToUpdate: ["name"],
      searchPhraseFields: ["name"],
    });
  }
}
