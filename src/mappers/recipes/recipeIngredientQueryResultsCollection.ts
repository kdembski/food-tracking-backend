import { RecipeIngredientQueryResult } from "@/dtos/recipes/recipeIngredient";
import { RecipeIngredientsCollection } from "@/main/recipes/collections/recipeIngredients";
import { RecipeIngredientQueryResultMapper } from "./recipeIngredientQueryResult";
import { IToDomainMapper } from "@/interfaces/_shared/mappers/toDomainMapper";

export class RecipeIngredientQueryResultsCollectionMapper
  implements
    IToDomainMapper<RecipeIngredientsCollection, RecipeIngredientQueryResult[]>
{
  toDomain(dtos: RecipeIngredientQueryResult[]) {
    return new RecipeIngredientsCollection(
      dtos.map((dto) => new RecipeIngredientQueryResultMapper().toDomain(dto))
    );
  }
}
