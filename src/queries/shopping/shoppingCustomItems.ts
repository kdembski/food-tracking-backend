import { Field } from "../_shared/components/models/field";
import { CRUDQueries } from "../_shared/crud";
import { SelectQuery } from "../_shared/models/select";

export class ShoppingCustomItemsQueries extends CRUDQueries {
  constructor() {
    super(
      "shopping_custom_items",
      [new Field({ name: "*" })],
      ["name"],
      ["name"]
    );
  }

  getSelectOptions() {
    return new SelectQuery(this.tableName, [
      new Field({ name: "id" }),
      new Field({ name: "name" }),
    ]).query;
  }
}
