import { IDbEntityController } from "@/interfaces/base/dbEntity";
import { ShoppingItem } from "@/main/shopping/models/shoppingItem";
import { OkPacket } from "mysql2";

export interface IShoppingItemsController
  extends IDbEntityController<ShoppingItem> {
  getNotRemovedByShoppingListId(
    shoppingListId: number
  ): Promise<ShoppingItem[]>;
  updateIsChecked(id: number, isChecked: boolean): Promise<OkPacket>;
  updateIsRemoved(id: number, isRemoved: boolean): Promise<OkPacket>;
}
