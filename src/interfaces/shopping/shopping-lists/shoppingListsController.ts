import { IDbEntityController } from "@/interfaces/base/dbEntity";
import { ShoppingList } from "@/main/shopping/models/shoppingList";
import { ShoppingListCollection } from "@/main/shopping/models/shoppingListCollection";

export interface IShoppingListsController
  extends IDbEntityController<ShoppingList> {
  getAll(): Promise<ShoppingListCollection>;
}
