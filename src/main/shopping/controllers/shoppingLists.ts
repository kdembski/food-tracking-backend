import { IShoppingListsController } from "@/interfaces/shopping/shopping-lists/shoppingListsController";
import { ShoppingListMapper } from "@/mappers/shopping/shoppingList";
import { ShoppingListsRepository } from "@/repositories/shopping/shoppingLists";
import { ShoppingList } from "../models/shoppingList";
import { ShoppingItemsController } from "./shoppingItems";

export class ShoppingListsController implements IShoppingListsController {
  async getAll() {
    const dtos = await new ShoppingListsRepository().selectAll();
    const lists = dtos.map((dto) => new ShoppingListMapper().toDomain(dto));

    const counts = lists.map((list) => {
      if (!list.id) {
        return;
      }
      return new ShoppingItemsController().getNotRemovedCountByShoppingListId(
        list.id
      );
    });

    await Promise.all(counts).then((counts) => {
      lists.forEach(async (list, index) => {
        list.count = counts[index];
      });
    });

    return lists;
  }

  async getById(id: number) {
    const dto = await new ShoppingListsRepository().selectById(id);
    return new ShoppingList(dto);
  }

  create(list: ShoppingList) {
    return new ShoppingListsRepository().insert(list);
  }

  update(list: ShoppingList) {
    return new ShoppingListsRepository().update(list);
  }

  async delete(id: number) {
    await this.deleteItems(id);
    return new ShoppingListsRepository().delete(id);
  }

  async deleteItems(id: number) {
    const items =
      await new ShoppingItemsController().getNotRemovedByShoppingListId(id);

    const promises = items.map((item) => {
      if (!item.id) {
        return;
      }

      if (item.isChecked) {
        return new ShoppingItemsController().updateIsRemoved(item.id, true);
      }

      return new ShoppingItemsController().delete(item.id);
    });

    await Promise.all(promises);
  }
}
