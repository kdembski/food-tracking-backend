import { ShoppingItem } from "@/main/shopping/models/shoppingItem";
import { BaseRepository } from "../_shared/base";
import { ShoppingItemQueryResult } from "@/dtos/shopping/shoppingItems";
import { Database } from "@/config/database";
import { ShoppingItemsQueries } from "@/queries/shopping/shoppingItems";
import { OkPacket } from "mysql2";

export class ShoppingItemsRepository extends BaseRepository<
  ShoppingItem,
  ShoppingItemQueryResult
> {
  protected queries: ShoppingItemsQueries;

  constructor(
    database = Database.getInstance(),
    queries = new ShoppingItemsQueries()
  ) {
    super(database, queries);
    this.queries = queries;
  }

  async selectNotRemovedByShoppingListId(shoppingListId: number) {
    const query = this.queries.getSelectNotRemovedByShoppingListId();
    const results = await this.database.sendQuery(query, [shoppingListId]);

    return results as ShoppingItemQueryResult[];
  }

  async selectNotRemovedCountByShoppingListId(shoppingListId: number) {
    const query = this.queries.getSelectNotRemovedCountByShoppingListId();
    const results = await this.database.sendQuery(query, [shoppingListId]);

    return parseInt(results[0].count);
  }

  async updateIsChecked(id: number, isChecked: boolean) {
    const query = this.queries.getUpdateIsChecked();
    const checkedAt = isChecked ? new Date() : null;
    const results = await this.database.sendQuery(query, [
      isChecked,
      checkedAt,
      id,
    ]);

    return results as OkPacket;
  }

  async updateIsRemoved(id: number, isRemoved: boolean) {
    const query = this.queries.getUpdateIsRemoved();
    const results = await this.database.sendQuery(query, [isRemoved, id]);

    return results as OkPacket;
  }

  async deleteByRecipeId(recipeId: number) {
    const query = this.queries.getDeleteByRecipeId();
    const results = await this.database.sendQuery(query, [recipeId]);
    return results as OkPacket;
  }

  getFieldsToInsert(model: ShoppingItem) {
    return [
      model.shoppingListId,
      model.recipeId,
      model.ingredientUnitId,
      model.customItemId,
      model.amount,
    ];
  }

  getFieldsToUpdate(model: ShoppingItem) {
    return [
      model.shoppingListId,
      model.recipeId,
      model.ingredientUnitId,
      model.customItemId,
      model.amount,
      model.id,
    ];
  }
}
