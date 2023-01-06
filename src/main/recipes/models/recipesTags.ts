import { Tags } from "@/base/tags/models/tags";
import { RecipesRepository } from "@/repositories/recipes/recipes";

export class RecipesTags extends Tags {
  constructor() {
    super(new RecipesRepository());
  }
}
