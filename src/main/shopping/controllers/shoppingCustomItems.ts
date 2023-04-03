import { IShoppingCustomItemsController } from "@/interfaces/shopping/shopping-custom-items/shoppingCustomItemsController";
import { ShoppingCustomItemsRepository } from "@/repositories/shopping/shoppingCustomItems";
import { ShoppingCustomItem } from "../models/shoppingCustomItem";

export class ShoppingCustomItemsController
  implements IShoppingCustomItemsController
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
