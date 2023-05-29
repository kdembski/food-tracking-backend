import { RecipeDTO } from "@/dtos/recipes/recipe";
import { IMapper } from "@/interfaces/_shared/mapper";
import { Recipe } from "@/main/recipes/models/recipe";

export class RecipeMapper implements IMapper<Recipe, RecipeDTO> {
  toDTO(model: Recipe) {
    return {
      id: model.id,
      recipeName: model.recipeName,
      preparationTime: model.preparationTime,
      tags: model.tags,
      cookidooLink: model.cookidooLink,
    };
  }

  toDomain(dto: RecipeDTO) {
    return new Recipe(dto);
  }
}
