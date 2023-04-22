import { IShoppingListsController } from "@/interfaces/shopping/shopping-lists/shoppingListsController";
import { ShoppingListsRepository } from "@/repositories/shopping/shoppingLists";
import { ShoppingList } from "../models/shoppingList";
import { ShoppingItemsController } from "./shoppingItems";
import { ShoppingListCollectionBuilder } from "../builders/shoppingListCollection";

export class ShoppingListsController implements IShoppingListsController {
  async getAll() {
    const dtos = await new ShoppingListsRepository().selectAll();
    const builder = new ShoppingListCollectionBuilder(dtos);
    await builder.build();
    return builder.collection;
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
