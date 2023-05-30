import { IMapper } from "@/interfaces/_shared/mappers/mapper";
import { IngredientUnitMapper } from "./ingredientUnit";
import { IngredientUnitDTO } from "@/dtos/ingredients/ingredientUnit";
import { IngredientUnitsCollection } from "@/main/ingredients/collections/ingredientUnits";

export class IngredientUnitsCollectionMapper
  implements IMapper<IngredientUnitsCollection, IngredientUnitDTO[]>
{
  toDTO(model?: IngredientUnitsCollection) {
    return (
      model?.items?.map((unit) => new IngredientUnitMapper().toDTO(unit)) || []
    );
  }

  toDomain(dto?: IngredientUnitDTO[]) {
    return new IngredientUnitsCollection(
      dto?.map((unit) => new IngredientUnitMapper().toDomain(unit)) || []
    );
  }
}
