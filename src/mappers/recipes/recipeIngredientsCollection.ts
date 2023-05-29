import {
  RecipeIngredientDTO,
  RecipeIngredientQueryResult,
} from "@/dtos/recipes/recipeIngredient";
import { IMapper } from "@/interfaces/_shared/mapper";
import { RecipeIngredientsCollection } from "@/main/recipes/collections/recipeIngredients";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { RecipeIngredientMapper } from "./recipeIngredient";
import { RecipeIngredientQueryResultMapper } from "./recipeIngredientQueryResult";

export class RecipeIngredientCollectionMapper
  implements IMapper<RecipeIngredientsCollection, RecipeIngredientDTO[]>
{
  toDTO(collection: RecipeIngredientsCollection) {
    return collection.items.map((item) =>
      new RecipeIngredientMapper().toDTO(item)
    );
  }

  toDomain(dtos: RecipeIngredientDTO[]) {
    return new RecipeIngredientsCollection(
      dtos.map((dto) => new RecipeIngredient(dto))
    );
  }
}
