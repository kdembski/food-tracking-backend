import { IDbEntityController } from "@/interfaces/base/dbEntity";
import { ShoppingList } from "@/main/shopping/models/shoppingList";

export interface IShoppingListsController
  extends IDbEntityController<ShoppingList> {
  getAll(): Promise<ShoppingList[]>;
}
