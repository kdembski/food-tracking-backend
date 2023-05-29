import { ShoppingCustomItem } from "@/main/shopping/models/shoppingCustomItem";
import { BaseRepository } from "../_shared/base";
import {
  ShoppingCustomItemDTO,
  ShoppingCustomItemOptionDTO,
} from "@/dtos/shopping/shoppingCustomItems";
import { ShoppingCustomItemsQueries } from "@/queries/shopping/shoppingCustomItems";
import { Database } from "@/config/database";

export class ShoppingCustomItemsRepository extends BaseRepository<
  ShoppingCustomItem,
  ShoppingCustomItemDTO
> {
  protected queries: ShoppingCustomItemsQueries;

  constructor(
    database = Database.getInstance(),
    queries = new ShoppingCustomItemsQueries()
  ) {
    super(database, queries);
    this.queries = queries;
  }

  async selectOptions() {
    const query = this.queries.getSelectOptions("name");
    const data = await this.database.sendQuery(query);

    return data as ShoppingCustomItemOptionDTO[];
  }

  getFieldsToInsert(model: ShoppingCustomItem) {
    return [model.name];
  }

  getFieldsToUpdate(model: ShoppingCustomItem) {
    return [model.name, model.id];
  }
}
