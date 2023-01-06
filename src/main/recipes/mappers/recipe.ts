import { RecipeDTO } from "@/dtos/recipes/recipe";
import { IMapper } from "@/interfaces/base/mapper";
import { Recipe } from "../models/recipe";

export class RecipeMapper implements IMapper<Recipe, RecipeDTO> {
  toDTO(model: Recipe) {
    return {
      id: model.id,
      recipeName: model.recipeName,
      preparationTime: model.preparationTime,
      tags: model.tags,
      kcal: model.kcal,
      cookedDate: model.cookedDate,
      cookidooLink: model.cookidooLink,
      datesFromLastYear: model.datesFromLastYear,
    };
  }

  toDomain(dto: RecipeDTO) {
    return new Recipe(dto);
  }
}
