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
      ingredientId: model.ingredientId,
      shoppingListId: model.shoppingListId,
      customItemId: model.customItemId,
      amount: model.amount,
      ingredientName: model.ingredientName,
      unitShortcut: model.unitShortcut,
      primaryUnitShortcut: model.primaryUnitShortcut,
      customItemName: model.customItemName,
      isChecked: model.isChecked,
      checkedAt: model.checkedAt,
      isRemoved: model.isRemoved,
      ingredientCategoryId: model.ingredientCategoryId,
      isPrimary: model.isPrimary,
      converterToPrimary: model.converterToPrimary,
    };
  }

  toDomain(dto: ShoppingItemDTO) {
    return new ShoppingItem({
      id: dto.id,
      recipeId: dto.recipeId,
      ingredientUnitId: dto.ingredientUnitId,
      ingredientId: dto.ingredientId,
      shoppingListId: dto.shoppingListId,
      customItemId: dto.customItemId,
      amount: dto.amount,
      ingredientName: dto.ingredientName,
      unitShortcut: dto.unitShortcut,
      primaryUnitShortcut: dto.primaryUnitShortcut,
      customItemName: dto.customItemName,
      isChecked: dto.isChecked,
      checkedAt: dto.checkedAt ? new Date(dto.checkedAt) : undefined,
      isRemoved: dto.isRemoved,
      ingredientCategoryId: dto.ingredientCategoryId,
      isPrimary: dto.isPrimary,
      converterToPrimary: dto.converterToPrimary,
    });
  }
}
