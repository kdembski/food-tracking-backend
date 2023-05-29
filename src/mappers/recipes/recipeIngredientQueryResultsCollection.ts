import { RecipeIngredientQueryResult } from "@/dtos/recipes/recipeIngredient";
import { IMapper } from "@/interfaces/_shared/mapper";
import { RecipeIngredientsCollection } from "@/main/recipes/collections/recipeIngredients";
import { RecipeIngredientQueryResultMapper } from "./recipeIngredientQueryResult";

export class RecipeIngredientQueryResultsCollectionMapper
  implements
    IMapper<RecipeIngredientsCollection, RecipeIngredientQueryResult[]>
{
  toDTO(collection: RecipeIngredientsCollection) {
    return collection.items.map((item) =>
      new RecipeIngredientQueryResultMapper().toDTO(item)
    );
  }

  toDomain(dtos: RecipeIngredientQueryResult[]) {
    return new RecipeIngredientsCollection(
      dtos.map((dto) => new RecipeIngredientQueryResultMapper().toDomain(dto))
    );
  }
}
