import { ShoppingItemQueryResult } from "@/dtos/shopping/shoppingItems";
import { IMapper } from "@/interfaces/_shared/mapper";
import { ShoppingItem } from "@/main/shopping/models/shoppingItem";

export class ShoppingItemQueryResultMapper
  implements IMapper<ShoppingItem, ShoppingItemQueryResult>
{
  toDTO(model: ShoppingItem) {
    return {
      id: model.id,
      recipeId: model.recipeId,
      ingredientUnitId: model.ingredientUnitId,
      ingredientId: model.ingredientId,
      shoppingListId: model.shoppingListId,
      customItemId: model.customItemId,
      amount: model.amount?.toString(),
      ingredientName: model.ingredientName,
      unitShortcut: model.unitShortcut,
      primaryUnitShortcut: model.primaryUnitShortcut,
      customItemName: model.customItemName,
      isChecked: model.isChecked ? 1 : 0,
      checkedAt: model.checkedAt,
      isRemoved: model.isRemoved ? 1 : 0,
      ingredientCategoryId: model.ingredientCategoryId,
      isPrimary: model.isPrimary ? 1 : 0,
      converterToPrimary: model.converterToPrimary?.toString(),
    };
  }

  toDomain(dto: ShoppingItemQueryResult) {
    return new ShoppingItem({
      id: dto.id,
      recipeId: dto.recipeId,
      ingredientUnitId: dto.ingredientUnitId,
      ingredientId: dto.ingredientId,
      shoppingListId: dto.shoppingListId,
      customItemId: dto.customItemId,
      amount: dto.amount ? parseFloat(dto.amount) : undefined,
      ingredientName: dto.ingredientName,
      unitShortcut: dto.unitShortcut,
      primaryUnitShortcut: dto.primaryUnitShortcut,
      customItemName: dto.customItemName,
      isChecked: !!dto.isChecked,
      checkedAt: dto.checkedAt ? new Date(dto.checkedAt) : undefined,
      isRemoved: !!dto.isRemoved,
      ingredientCategoryId: dto.ingredientCategoryId,
      isPrimary: !!dto.isPrimary,
      converterToPrimary: dto.converterToPrimary
        ? parseFloat(dto.converterToPrimary)
        : undefined,
    });
  }
}
