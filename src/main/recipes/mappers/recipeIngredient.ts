import { RecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { IMapper } from "@/interfaces/base/mapper";
import { RecipeIngredient } from "../models/recipeIngredient";

export class RecipeIngredientMapper
  implements IMapper<RecipeIngredient, RecipeIngredientDTO>
{
  toDTO(model: RecipeIngredient) {
    return {
      id: model.id,
      ingredierecipeIdtId: model.recipeId,
      ingredientUnitId: model.ingredientUnitId,
      amount: model.amount,
    };
  }

  toDomain(dto: RecipeIngredientDTO) {
    return new RecipeIngredient(dto);
  }
}
