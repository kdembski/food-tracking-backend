import { ShoppingItemQueryResult } from "@/dtos/shopping/shoppingItems";
import { IRepository } from "@/interfaces/base/dbEntity";
import { ShoppingItem } from "@/main/shopping/models/shoppingItem";
import { OkPacket } from "mysql2";

export interface IShoppingItemsRepository
  extends IRepository<ShoppingItem, ShoppingItemQueryResult> {
  selectNotRemovedByShoppingListId(
    shoppingListId: number
  ): Promise<ShoppingItemQueryResult[]>;
  updateIsChecked(id: number, isChecked: boolean): Promise<OkPacket>;
  updateIsRemoved(id: number, isRemoved: boolean): Promise<OkPacket>;
}
