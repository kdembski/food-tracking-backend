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
      customItemName: model.customItemName,
      isChecked: model.isChecked,
      checkedAt: model.checkedAt,
      isRemoved: model.isRemoved,
      ingredientCategoryId: model.ingredientCategoryId,
    };
  }

  toDomain(dto: ShoppingItemDTO) {
    return new ShoppingItem({
      id: dto.id,
      recipeId: dto.recipeId,
      ingredientUnitId: dto.ingredientUnitId,
      shoppingListId: dto.shoppingListId,
      customItemId: dto.customItemId,
      amount: dto.amount,
      ingredientName: dto.ingredientName,
      unitShortcut: dto.unitShortcut,
      customItemName: dto.customItemName,
      isChecked: dto.isChecked,
      checkedAt: dto.checkedAt ? new Date(dto.checkedAt) : undefined,
      isRemoved: dto.isRemoved,
      ingredientCategoryId: dto.ingredientCategoryId,
    });
  }
}
