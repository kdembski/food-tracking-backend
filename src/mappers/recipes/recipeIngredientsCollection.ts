import { ExtendedRecipeIngredientMapper } from "./extendedRecipeIngredient";
import { ExtendedRecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { IMapper } from "@/interfaces/base/mapper";
import { RecipeIngredientsCollection } from "@/main/recipes/collections/recipeIngredients";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";

export class RecipeIngredientCollectionMapper
  implements
    IMapper<RecipeIngredientsCollection, ExtendedRecipeIngredientDTO[]>
{
  toDTO(collection: RecipeIngredientsCollection) {
    return collection.items.map((item) =>
      new ExtendedRecipeIngredientMapper().toDTO(item)
    );
  }

  toDomain(dtos: ExtendedRecipeIngredientDTO[]) {
    return new RecipeIngredientsCollection(
      dtos.map((dto) => new RecipeIngredient(dto))
    );
  }
}
