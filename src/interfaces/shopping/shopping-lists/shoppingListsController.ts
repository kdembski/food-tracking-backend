import { IDbEntityController } from "@/interfaces/base/dbEntity";
import { ShoppingList } from "@/main/shopping/models/shoppingList";
import { ShoppingListsCollection } from "@/main/shopping/models/shoppingListsCollection";

export interface IShoppingListsController
  extends IDbEntityController<ShoppingList> {
  getAll(): Promise<ShoppingListsCollection>;
}
