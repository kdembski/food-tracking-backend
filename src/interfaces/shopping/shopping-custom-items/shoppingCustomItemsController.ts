import { ShoppingCustomItemOptionDTO } from "@/dtos/shopping/shoppingCustomItems";
import { IDbEntityController } from "@/interfaces/base/dbEntity";
import { ShoppingCustomItem } from "@/main/shopping/models/shoppingCustomItem";

export interface IShoppingCustomItemsController
  extends IDbEntityController<ShoppingCustomItem> {
  getOptions(): Promise<ShoppingCustomItemOptionDTO[]>;
}
