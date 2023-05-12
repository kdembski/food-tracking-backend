import { ShoppingListsRepository } from "@/repositories/shopping/shoppingLists";
import { ShoppingList } from "../models/shoppingList";
import { ShoppingItemsCollectionController } from "./shoppingItemsCollection";
import { ShoppingListsCollectionBuilder } from "../builders/shoppingListsCollection";
import { IDbEntityController } from "@/interfaces/base/db-entity/dbEntityController";

export class ShoppingListsController
  implements IDbEntityController<ShoppingList>
{
  async getAll() {
    const dtos = await new ShoppingListsRepository().selectAll();
    const builder = new ShoppingListsCollectionBuilder(dtos);
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
    await new ShoppingItemsCollectionController().deleteByShoppingListId(id);
    return new ShoppingListsRepository().delete(id);
  }
}
