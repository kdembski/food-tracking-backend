import { RecipeQueryResult } from "@/dtos/recipes/recipe";
import { IToDomainMapper } from "@/interfaces/_shared/mappers/toDomainMapper";
import { Recipe } from "@/main/recipes/models/recipe";

export class RecipeQueryResultMapper
  implements IToDomainMapper<Recipe, RecipeQueryResult>
{
  toDomain(dto: RecipeQueryResult) {
    return new Recipe(dto);
  }
}
