import { IShoppingItemsController } from "@/interfaces/shopping/shopping-items/shoppingItemsController";
import { ShoppingItemMapper } from "@/mappers/shopping/shoppingItem";
import { ShoppingItemsRepository } from "@/repositories/shopping/shoppingItems";
import { ShoppingItem } from "../models/shoppingItem";

export class ShoppingItemsController implements IShoppingItemsController {
  async getById(id: number) {
    const dto = await new ShoppingItemsRepository().selectById(id);
    return new ShoppingItemMapper().toDomain(dto);
  }

  async getNotRemovedByShoppingListId(shoppingListId: number) {
    const dtos =
      await new ShoppingItemsRepository().selectNotRemovedByShoppingListId(
        shoppingListId
      );
    return dtos.map((dto) => new ShoppingItemMapper().toDomain(dto));
  }

  create(item: ShoppingItem) {
    return new ShoppingItemsRepository().insert(item);
  }

  update(item: ShoppingItem) {
    return new ShoppingItemsRepository().update(item);
  }

  updateIsChecked(id: number, isChecked: boolean) {
    return new ShoppingItemsRepository().updateIsChecked(id, isChecked);
  }

  updateIsRemoved(id: number, isRemoved: boolean) {
    return new ShoppingItemsRepository().updateIsRemoved(id, isRemoved);
  }

  delete(id: number) {
    return new ShoppingItemsRepository().delete(id);
  }
}
