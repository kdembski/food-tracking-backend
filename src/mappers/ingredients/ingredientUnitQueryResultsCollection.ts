import { IngredientUnitQueryResult } from "@/dtos/ingredients/ingredientUnit";
import { IngredientUnitsCollection } from "@/main/ingredients/collections/ingredientUnits";
import { IngredientUnitQueryResultMapper } from "./ingredientUnitQueryResult";
import { IToDomainMapper } from "@/interfaces/_shared/mappers/toDomainMapper";

export class IngredientUnitQueryResultCollectionMapper
  implements
    IToDomainMapper<IngredientUnitsCollection, IngredientUnitQueryResult[]>
{
  toDomain(dto: IngredientUnitQueryResult[]) {
    return new IngredientUnitsCollection(
      dto.map((unit) => new IngredientUnitQueryResultMapper().toDomain(unit))
    );
  }
}
