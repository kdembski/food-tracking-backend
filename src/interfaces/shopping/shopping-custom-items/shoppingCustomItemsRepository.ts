import {
  ShoppingCustomItemDTO,
  ShoppingCustomItemOptionDTO,
} from "@/dtos/shopping/shoppingCustomItems";
import { IRepository } from "@/interfaces/base/dbEntity";
import { ShoppingCustomItem } from "@/main/shopping/models/shoppingCustomItem";

export interface IShoppingCustomItemsRepository
  extends IRepository<ShoppingCustomItem, ShoppingCustomItemDTO> {
  selectOptions(): Promise<ShoppingCustomItemOptionDTO[]>;
}
