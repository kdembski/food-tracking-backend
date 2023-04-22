import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";
import { IMapper } from "@/interfaces/base/mapper";
import { ShoppingListCollection } from "@/main/shopping/models/shoppingListCollection";
import { ShoppingListMapper } from "./shoppingList";
import { ShoppingList } from "@/main/shopping/models/shoppingList";

export class ShoppingListCollectionMapper
  implements IMapper<ShoppingListCollection, ShoppingListDTO[]>
{
  toDTO(model: ShoppingListCollection) {
    return (
      model.items?.map((list) => new ShoppingListMapper().toDTO(list)) || []
    );
  }

  toDomain(dtos: ShoppingListDTO[]) {
    return new ShoppingListCollection(dtos.map((dto) => new ShoppingList(dto)));
  }
}
