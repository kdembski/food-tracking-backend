import { TagsConfig } from "@/interfaces/base/tags";
import { Tags } from "@/base/tags/models/tags";
import { RecipesRepository } from "@/repositories/recipes/recipes";

export class RecipesTags extends Tags {
  getTags(config: TagsConfig): Promise<string[]> {
    return new RecipesRepository().selectTags(config);
  }
}
