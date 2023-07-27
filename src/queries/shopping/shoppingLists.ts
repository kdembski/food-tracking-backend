import { Field } from "../_shared/components/models/field";
import { CRUDQueries } from "../_shared/crud";
import { SelectQuery } from "../_shared/models/select";

export class ShoppingListsQueries extends CRUDQueries {
  constructor() {
    super("shopping_lists", [new Field({ name: "*" })], ["name"], ["name"]);
  }

  getSelectAll() {
    return new SelectQuery(this.tableName, this.fieldsToSelect).query;
  }
}
