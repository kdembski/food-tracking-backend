import { RecipeIngredientQueryResult } from "@/dtos/recipes/recipeIngredient";
import { IMapper } from "@/interfaces/base/mapper";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";

export class RecipeIngredientQueryResultMapper
  implements IMapper<RecipeIngredient, RecipeIngredientQueryResult>
{
  toDTO(model: RecipeIngredient) {
    return {
      id: model.id,
      recipeId: model.recipeId,
      ingredientUnitId: model.ingredientUnitId,
      ingredientId: model.ingredientId,
      unitId: model.unitId,
      amount: model.amount?.toString(),
      ingredientName: model.ingredientName,
      unitShortcut: model.unitShortcut,
      kcalPerUnit: model.kcalPerUnit?.toString(),
      isPrimary: model.isPrimary,
      converterToPrimary: model.converterToPrimary?.toString(),
    };
  }

  toDomain(dto: RecipeIngredientQueryResult) {
    return new RecipeIngredient({
      id: dto.id,
      recipeId: dto.recipeId,
      ingredientUnitId: dto.ingredientUnitId,
      ingredientId: dto.ingredientId,
      unitId: dto.unitId,
      amount: parseFloat(dto.amount || ""),
      ingredientName: dto.ingredientName,
      unitShortcut: dto.unitShortcut,
      kcalPerUnit: parseFloat(dto.kcalPerUnit || ""),
      isPrimary: dto.isPrimary,
      converterToPrimary: parseFloat(dto.converterToPrimary || ""),
    });
  }
}
