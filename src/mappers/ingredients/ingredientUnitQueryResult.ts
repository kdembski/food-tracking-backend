import { IngredientUnitQueryResult } from "@/dtos/ingredients/ingredientUnit";
import { IMapper } from "@/interfaces/_shared/mapper";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";

export class IngredientUnitQueryResultMapper
  implements IMapper<IngredientUnit, IngredientUnitQueryResult>
{
  toDTO(model: IngredientUnit) {
    return {
      id: model.id,
      ingredientId: model.ingredientId,
      unitId: model.unitId,
      unitName: model.unitName,
      unitShortcut: model.unitShortcut,
      kcalPerUnit: model.kcalPerUnit?.toString(),
      isPrimary: model.isPrimary ? 1 : 0,
      converterToPrimary: model.converterToPrimary?.toString(),
    };
  }

  toDomain(dto: IngredientUnitQueryResult) {
    return new IngredientUnit({
      id: dto.id,
      ingredientId: dto.ingredientId,
      unitId: dto.unitId,
      unitName: dto.unitName,
      unitShortcut: dto.unitShortcut,
      kcalPerUnit: parseFloat(dto.kcalPerUnit || ""),
      isPrimary: !!dto.isPrimary,
      converterToPrimary: parseFloat(dto.converterToPrimary || ""),
    });
  }
}
