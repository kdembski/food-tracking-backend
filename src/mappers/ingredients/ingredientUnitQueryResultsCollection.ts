import { IMapper } from "@/interfaces/_shared/mapper";
import { IngredientUnitQueryResult } from "@/dtos/ingredients/ingredientUnit";
import { IngredientUnitsCollection } from "@/main/ingredients/collections/ingredientUnits";
import { IngredientUnitQueryResultMapper } from "./ingredientUnitQueryResult";

export class IngredientUnitQueryResultCollectionMapper
  implements IMapper<IngredientUnitsCollection, IngredientUnitQueryResult[]>
{
  toDTO(model: IngredientUnitsCollection) {
    return model.items.map((unit) =>
      new IngredientUnitQueryResultMapper().toDTO(unit)
    );
  }

  toDomain(dto: IngredientUnitQueryResult[]) {
    return new IngredientUnitsCollection(
      dto.map((unit) => new IngredientUnitQueryResultMapper().toDomain(unit))
    );
  }
}
