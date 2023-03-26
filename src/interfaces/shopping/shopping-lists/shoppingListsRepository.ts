import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";
import { IRepository } from "@/interfaces/base/dbEntity";
import { ShoppingList } from "@/main/shopping/models/shoppingList";

export interface IShoppingListsRepository
  extends IRepository<ShoppingList, ShoppingListDTO> {
  selectAll(): Promise<ShoppingListDTO[]>;
}
