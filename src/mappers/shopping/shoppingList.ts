import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";
import { IMapper } from "@/interfaces/base/mapper";
import { ShoppingList } from "@/main/shopping/models/shoppingList";

export class ShoppingListMapper
  implements IMapper<ShoppingList, ShoppingListDTO>
{
  toDTO(model: ShoppingList) {
    return {
      id: model.id,
      name: model.name,
      count: model.count,
      recipeIds: model.recipeIds || [],
    };
  }

  toDomain(dto: ShoppingListDTO) {
    return new ShoppingList(dto);
  }
}
