import { Tags } from "@/base/tags/models/tags";
import { RecipesRepository } from "@/repositories/recipes/recipes";

export class RecipesTags extends Tags {
  protected getTags(searchPhrase: string, tags?: string): Promise<string[]> {
    return new RecipesRepository().selectTags(searchPhrase, tags);
  }
}
