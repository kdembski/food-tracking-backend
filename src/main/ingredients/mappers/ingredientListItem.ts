import { IngredientListItemDTO } from "@/dtos/ingredients/ingredient";
import { IMapper } from "@/interfaces/base/mapper";
import { Ingredient } from "../models/ingredient";

export class IngredientListItemMapper
  implements IMapper<Ingredient, IngredientListItemDTO>
{
  toDTO(model: Ingredient) {
    return {
      id: model.id,
      name: model.name,
      categoryId: model.categoryId,
      categoryName: model.categoryName,
      unitNames: model.units?.getUnitNames(),
    };
  }

  toDomain(dto: IngredientListItemDTO) {
    return new Ingredient(dto);
  }
}
