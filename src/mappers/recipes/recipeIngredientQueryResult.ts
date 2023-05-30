import { RecipeIngredientQueryResult } from "@/dtos/recipes/recipeIngredient";
import { IToDomainMapper } from "@/interfaces/_shared/mappers/toDomainMapper";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";

export class RecipeIngredientQueryResultMapper
  implements IToDomainMapper<RecipeIngredient, RecipeIngredientQueryResult>
{
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
