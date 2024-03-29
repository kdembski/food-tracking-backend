import { RecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { IMapper } from "@/interfaces/_shared/mappers/mapper";
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
      ingredientName: model.ingredientName,
      unitShortcut: model.unitShortcut,
      kcalPerUnit: model.kcalPerUnit,
      isPrimary: model.isPrimary,
      converterToPrimary: model.converterToPrimary,
    };
  }

  toDomain(dto: RecipeIngredientDTO) {
    return new RecipeIngredient(dto);
  }
}
