import { ShoppingItemQueryResult } from "@/dtos/shopping/shoppingItems";
import { IToDomainMapper } from "@/interfaces/_shared/mappers/toDomainMapper";
import { ShoppingItem } from "@/main/shopping/models/shoppingItem";

export class ShoppingItemQueryResultMapper
  implements IToDomainMapper<ShoppingItem, ShoppingItemQueryResult>
{
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
