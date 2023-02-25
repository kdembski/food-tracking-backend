import { ExtendedRecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { IMapper } from "@/interfaces/base/mapper";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";

export class ExtendedRecipeIngredientMapper
  implements IMapper<RecipeIngredient, ExtendedRecipeIngredientDTO>
{
  toDTO(model: RecipeIngredient) {
    return {
      id: model.id,
      recipeId: model.recipeId,
      ingredientUnitId: model.ingredientUnitId,
      amount: model.amount,
      ingredientName: model.ingredientName,
      unitShortcut: model.unitShortcut,
      kcalPerUnit: model.kcalPerUnit,
      isPrimary: model.isPrimary,
      converterToPrimary: model.converterToPrimary,
    };
  }

  toDomain(dto: ExtendedRecipeIngredientDTO) {
    return new RecipeIngredient(dto);
  }
}
