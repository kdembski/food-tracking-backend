import { Field } from "../_shared/models/field";
import { Queries } from "../_shared/models/queries";

export class ShoppingCustomItemsQueries extends Queries {
  constructor() {
    super({
      tableName: "shopping_custom_items",
      fieldsToSelect: [new Field({ name: "*" })],
      fieldsToInsert: ["name"],
      fieldsToUpdate: ["name"],
    });
  }
}
