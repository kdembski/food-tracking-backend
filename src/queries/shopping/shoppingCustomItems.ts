import { Field } from "@/base/queries/models/field";
import { Queries } from "@/base/queries/queries";

export class ShoppingCustomItemsQueries extends Queries {
  constructor() {
    super({
      tableName: "shopping_custom_items",
      fieldsToSelect: [new Field({ name: "*" })],
      fieldsToInsert: ["name"],
      fieldsToUpdate: ["name"],
      searchPhraseFields: ["name"],
    });
  }
}
