import { IShoppingListsController } from "@/interfaces/shopping/shopping-lists/shoppingListsController";
import { ShoppingListMapper } from "@/mappers/shopping/shoppingList";
import { ShoppingListsRepository } from "@/repositories/shopping/shoppingLists";
import { ShoppingList } from "../models/shoppingList";

export class ShoppingListsController implements IShoppingListsController {
  async getAll() {
    const dtos = await new ShoppingListsRepository().selectAll();
    return dtos.map((dto) => new ShoppingListMapper().toDomain(dto));
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

  delete(id: number) {
    return new ShoppingListsRepository().delete(id);
  }
}
