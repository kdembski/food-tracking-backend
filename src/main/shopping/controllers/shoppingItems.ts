import { ShoppingItemQueryResultMapper } from "@/mappers/shopping/shoppingItemQueryResult";
import { ShoppingItemsRepository } from "@/repositories/shopping/shoppingItems";
import { ShoppingItem } from "../models/shoppingItem";
import { IDbEntityController } from "@/interfaces/base/db-entity/dbEntityController";

export class ShoppingItemsController
  implements IDbEntityController<ShoppingItem>
{
  async getById(id: number) {
    const dto = await new ShoppingItemsRepository().selectById(id);
    return new ShoppingItemQueryResultMapper().toDomain(dto);
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

  deleteByRecipeId(recipeId: number) {
    return new ShoppingItemsRepository().deleteByRecipeId(recipeId);
  }
}
