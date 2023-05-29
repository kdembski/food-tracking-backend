import { IngredientUnitDTO } from "@/dtos/ingredients/ingredientUnit";
import { IMapper } from "@/interfaces/_shared/mapper";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";

export class IngredientUnitMapper
  implements IMapper<IngredientUnit, IngredientUnitDTO>
{
  toDTO(model: IngredientUnit) {
    return {
      id: model.id,
      ingredientId: model.ingredientId,
      unitId: model.unitId,
      unitName: model.unitName,
      unitShortcut: model.unitShortcut,
      kcalPerUnit: model.kcalPerUnit,
      isPrimary: model.isPrimary,
      converterToPrimary: model.converterToPrimary,
    };
  }

  toDomain(dto: IngredientUnitDTO) {
    return new IngredientUnit(dto);
  }
}
