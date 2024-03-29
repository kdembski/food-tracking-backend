import { IngredientUnitsCollectionMapper } from "./ingredientUnitsCollection";
import { IngredientDTO } from "@/dtos/ingredients/ingredient";
import { IMapper } from "@/interfaces/_shared/mappers/mapper";
import { Ingredient } from "@/main/ingredients/models/ingredient";

export class IngredientMapper implements IMapper<Ingredient, IngredientDTO> {
  toDTO(model: Ingredient) {
    return {
      id: model.id,
      name: model.name,
      categoryId: model.categoryId,
      categoryName: model.categoryName,
      units: new IngredientUnitsCollectionMapper().toDTO(model.units),
    };
  }

  toDomain(dto: IngredientDTO) {
    return new Ingredient({
      id: dto.id,
      name: dto.name,
      categoryId: dto.categoryId,
      units: new IngredientUnitsCollectionMapper().toDomain(dto.units),
    });
  }
}
