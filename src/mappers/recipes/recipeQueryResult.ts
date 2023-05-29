import { RecipeQueryResult } from "@/dtos/recipes/recipe";
import { IMapper } from "@/interfaces/_shared/mapper";
import { Recipe } from "@/main/recipes/models/recipe";

export class RecipeQueryResultMapper
  implements IMapper<Recipe, RecipeQueryResult>
{
  toDTO(model: Recipe) {
    return {
      id: model.id,
      recipeName: model.recipeName,
      preparationTime: model.preparationTime,
      tags: model.tags,
      cookidooLink: model.cookidooLink,
      kcal: model.kcal,
      cookedDate: model.cookedDate,
      ingredientIds: "",
    };
  }

  toDomain(dto: RecipeQueryResult) {
    return new Recipe(dto);
  }
}
