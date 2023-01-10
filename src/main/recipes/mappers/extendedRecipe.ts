import { ExtendedRecipeDTO } from "@/dtos/recipes/recipe";
import { IMapper } from "@/interfaces/base/mapper";
import { Recipe } from "../models/recipe";

export class ExtendedRecipeMapper
  implements IMapper<Recipe, ExtendedRecipeDTO>
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
      datesFromLastYear: model.datesFromLastYear,
    };
  }

  toDomain(dto: ExtendedRecipeDTO) {
    return new Recipe(dto);
  }
}
