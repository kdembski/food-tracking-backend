import { IngredientDTO } from "@/dtos/ingredients/ingredient";
import { IMapper } from "@/interfaces/base/mapper";
import { Ingredient } from "../models/ingredient";

export class IngredientMapper implements IMapper<Ingredient, IngredientDTO> {
  toDTO(model: Ingredient) {
    return {
      id: model.id,
      name: model.name,
      categoryId: model.categoryId,
      categoryName: model.categoryName,
      unitNames: model.unitNames,
    };
  }

  toDomain(dto: IngredientDTO) {
    return new Ingredient(dto);
  }
}
