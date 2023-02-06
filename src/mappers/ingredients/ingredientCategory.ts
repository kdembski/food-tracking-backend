import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { IMapper } from "@/interfaces/base/mapper";
import { IngredientCategory } from "@/main/ingredients/models/ingredientCategory";

export class IngredientCategoryMapper
  implements IMapper<IngredientCategory, IngredientCategoryDTO>
{
  toDTO(model: IngredientCategory) {
    return {
      id: model.id,
      name: model.name,
    };
  }

  toDomain(dto: IngredientCategoryDTO) {
    return new IngredientCategory(dto);
  }
}
