import { Database } from "@/config/database";
import { ShoppingListsQueries } from "@/queries/shopping/shoppingLists";
import { CRUDRepository } from "../_shared/crud";
import { ShoppingList } from "@/main/shopping/models/shoppingList";
import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";

export class ShoppingListsRepository extends CRUDRepository<
  ShoppingList,
  ShoppingListDTO
> {
  protected queries: ShoppingListsQueries;

  constructor(
    database = Database.getInstance(),
    queries = new ShoppingListsQueries()
  ) {
    super(database, queries);
    this.queries = queries;
  }

  async selectAll() {
    const query = this.queries.getSelectAll();
    const data = await this.database.sendQuery(query);

    return data as ShoppingListDTO[];
  }

  getFieldsToInsert(model: ShoppingList) {
    return [model.name];
  }

  getFieldsToUpdate(model: ShoppingList) {
    return [model.name, model.id];
  }
}
