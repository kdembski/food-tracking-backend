import { RecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { IMapper } from "@/interfaces/base/mapper";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";

export class RecipeIngredientMapper
  implements IMapper<RecipeIngredient, RecipeIngredientDTO>
{
  toDTO(model: RecipeIngredient) {
    return {
      id: model.id,
      recipeId: model.recipeId,
      ingredientUnitId: model.ingredientUnitId,
      ingredientId: model.ingredientId,
      unitId: model.unitId,
      amount: model.amount,
    };
  }

  toDomain(dto: RecipeIngredientDTO) {
    return new RecipeIngredient(dto);
  }
}
