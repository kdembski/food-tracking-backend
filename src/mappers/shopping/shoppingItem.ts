import { ShoppingItemDTO } from "@/dtos/shopping/shoppingItems";
import { IMapper } from "@/interfaces/base/mapper";
import { ShoppingItem } from "@/main/shopping/models/shoppingItem";

export class ShoppingItemMapper
  implements IMapper<ShoppingItem, ShoppingItemDTO>
{
  toDTO(model: ShoppingItem) {
    return {
      id: model.id,
      recipeId: model.recipeId,
      ingredientUnitId: model.ingredientUnitId,
      shoppingListId: model.shoppingListId,
      customItemId: model.customItemId,
      amount: model.amount,
      ingredientName: model.ingredientName,
      unitShortcut: model.unitShortcut,
      isChecked: model.isChecked,
      checkedAt: model.checkedAt,
      isRemoved: model.isRemoved,
    };
  }

  toDomain(dto: ShoppingItemDTO) {
    return new ShoppingItem(dto);
  }
}
