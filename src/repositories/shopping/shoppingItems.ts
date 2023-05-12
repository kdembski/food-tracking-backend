import Database from "@/config/database";
import { OkPacket } from "mysql2";
import { CustomError } from "@/base/errors/models/customError";
import { ShoppingItemsQueries } from "@/queries/shopping/shoppingItems";
import { ShoppingItemQueryResult } from "@/dtos/shopping/shoppingItems";
import { ShoppingItem } from "@/main/shopping/models/shoppingItem";
import { IRepository } from "@/interfaces/base/db-entity/repository";

export class ShoppingItemsRepository
  implements IRepository<ShoppingItem, ShoppingItemQueryResult>
{
  async selectById(id: number) {
    const query = new ShoppingItemsQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0];

    if (!dto) {
      throw new CustomError({
        message: "Shopping item with id: '" + id + "' not exists",
      });
    }

    return dto as ShoppingItemQueryResult;
  }

  async selectNotRemovedByShoppingListId(shoppingListId: number) {
    const query =
      new ShoppingItemsQueries().getSelectNotRemovedByShoppingListId();
    const results = await Database.sendQuery(query, [shoppingListId]);

    return results as ShoppingItemQueryResult[];
  }

  async selectNotRemovedCountByShoppingListId(shoppingListId: number) {
    const query =
      new ShoppingItemsQueries().getSelectNotRemovedCountByShoppingListId();
    const results = await Database.sendQuery(query, [shoppingListId]);

    return parseInt(results[0].count);
  }

  async insert(data: ShoppingItem) {
    const query = new ShoppingItemsQueries().getInsert();
    const results = await Database.sendQuery(query, [
      data.shoppingListId,
      data.recipeId,
      data.ingredientUnitId,
      data.customItemId,
      data.amount,
    ]);

    return results as OkPacket;
  }

  async update(data: ShoppingItem) {
    const query = new ShoppingItemsQueries().getUpdate();
    const results = await Database.sendQuery(query, [
      data.shoppingListId,
      data.recipeId,
      data.ingredientUnitId,
      data.customItemId,
      data.amount,
      data.id,
    ]);

    return results as OkPacket;
  }

  async updateIsChecked(id: number, isChecked: boolean) {
    const query = new ShoppingItemsQueries().getUpdateIsChecked();
    const checkedAt = isChecked ? new Date() : null;
    const results = await Database.sendQuery(query, [isChecked, checkedAt, id]);

    return results as OkPacket;
  }

  async updateIsRemoved(id: number, isRemoved: boolean) {
    const query = new ShoppingItemsQueries().getUpdateIsRemoved();
    const results = await Database.sendQuery(query, [isRemoved, id]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const query = new ShoppingItemsQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);
    return results as OkPacket;
  }

  async deleteByRecipeId(recipeId: number) {
    const query = new ShoppingItemsQueries().getDeleteByRecipeId();
    const results = await Database.sendQuery(query, [recipeId]);
    return results as OkPacket;
  }
}
