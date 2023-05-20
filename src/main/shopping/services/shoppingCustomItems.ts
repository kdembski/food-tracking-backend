import { ShoppingCustomItemsRepository } from "@/repositories/shopping/shoppingCustomItems";
import { ShoppingCustomItem } from "../models/shoppingCustomItem";
import { IDbEntityService } from "@/interfaces/base/db-entity/dbEntityService";

export class ShoppingCustomItemsService
  implements IDbEntityService<ShoppingCustomItem>
{
  getOptions() {
    return new ShoppingCustomItemsRepository().selectOptions();
  }

  async getById(id: number) {
    const dto = await new ShoppingCustomItemsRepository().selectById(id);
    return new ShoppingCustomItem(dto);
  }

  create(list: ShoppingCustomItem) {
    return new ShoppingCustomItemsRepository().insert(list);
  }

  update(list: ShoppingCustomItem) {
    return new ShoppingCustomItemsRepository().update(list);
  }

  delete(id: number) {
    return new ShoppingCustomItemsRepository().delete(id);
  }
}
