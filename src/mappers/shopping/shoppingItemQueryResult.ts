import { ShoppingItemQueryResult } from "@/dtos/shopping/shoppingItems";
import { IMapper } from "@/interfaces/base/mapper";
import { ShoppingItem } from "@/main/shopping/models/shoppingItem";

export class ShoppingItemQueryResultMapper
  implements IMapper<ShoppingItem, ShoppingItemQueryResult>
{
  toDTO(model: ShoppingItem) {
    return {
      id: model.id,
      recipeId: model.recipeId,
      ingredientUnitId: model.ingredientUnitId,
      shoppingListId: model.shoppingListId,
      customItemId: model.customItemId,
      amount: model.amount?.toString(),
      ingredientName: model.ingredientName,
      unitShortcut: model.unitShortcut,
      customItemName: model.customItemName,
      isChecked: model.isChecked ? 1 : 0,
      checkedAt: model.checkedAt,
      isRemoved: model.isRemoved ? 1 : 0,
    };
  }

  toDomain(dto: ShoppingItemQueryResult) {
    return new ShoppingItem({
      id: dto.id,
      recipeId: dto.recipeId,
      ingredientUnitId: dto.ingredientUnitId,
      shoppingListId: dto.shoppingListId,
      customItemId: dto.customItemId,
      amount: dto.amount ? parseFloat(dto.amount) : undefined,
      ingredientName: dto.ingredientName,
      unitShortcut: dto.unitShortcut,
      customItemName: dto.customItemName,
      isChecked: !!dto.isChecked,
      checkedAt: dto.checkedAt ? new Date(dto.checkedAt) : undefined,
      isRemoved: !!dto.isRemoved,
    });
  }
}
