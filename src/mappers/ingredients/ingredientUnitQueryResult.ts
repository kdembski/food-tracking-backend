import { IngredientUnitQueryResult } from "@/dtos/ingredients/ingredientUnit";
import { IToDomainMapper } from "@/interfaces/_shared/mappers/toDomainMapper";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";

export class IngredientUnitQueryResultMapper
  implements IToDomainMapper<IngredientUnit, IngredientUnitQueryResult>
{
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
