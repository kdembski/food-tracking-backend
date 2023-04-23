import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";
import { IMapper } from "@/interfaces/base/mapper";
import { ShoppingListsCollection } from "@/main/shopping/models/shoppingListsCollection";
import { ShoppingListMapper } from "./shoppingList";
import { ShoppingList } from "@/main/shopping/models/shoppingList";

export class ShoppingListsCollectionMapper
  implements IMapper<ShoppingListsCollection, ShoppingListDTO[]>
{
  toDTO(model: ShoppingListsCollection) {
    return (
      model.items?.map((list) => new ShoppingListMapper().toDTO(list)) || []
    );
  }

  toDomain(dtos: ShoppingListDTO[]) {
    return new ShoppingListsCollection(
      dtos.map((dto) => new ShoppingList(dto))
    );
  }
}
