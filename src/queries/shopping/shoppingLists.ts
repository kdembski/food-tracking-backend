import { Field } from "../_shared/models/field";
import { Queries } from "../_shared/models/queries";

export class ShoppingListsQueries extends Queries {
  constructor() {
    super({
      tableName: "shopping_lists",
      fieldsToSelect: [new Field({ name: "*" })],
      fieldsToInsert: ["name"],
      fieldsToUpdate: ["name"],
    });
  }
}
