import { IngredientUnitsCollection } from "./../collections/ingredientUnits";
import { IMapper } from "@/interfaces/base/mapper";
import { IngredientUnitMapper } from "./ingredientUnit";
import { IngredientUnitDTO } from "@/dtos/ingredients/ingredientUnit";

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
