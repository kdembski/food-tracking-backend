import { ExtendedRecipeDTO } from "@/dtos/recipes/recipe";
import { RecipeBuilder } from "./../builders/recipe";
import { ExtendedRecipeMapper } from "../../../mappers/recipes/extendedRecipe";
import { Recipe } from "./recipe";
import { List } from "@/base/list/models/list";
import { RecipeDTO } from "@/dtos/recipes/recipe";
import { RecipesRepository } from "@/repositories/recipes/recipes";

export class RecipesList extends List<
  Recipe,
  ExtendedRecipeDTO,
  ExtendedRecipeDTO
> {
  constructor() {
    super(new RecipesRepository(), new ExtendedRecipeMapper());
  }

  async createListItem(data: RecipeDTO) {
    const builder = new RecipeBuilder(data);
    await builder.produceDatesFromLastYear();
    return builder.getRecipe();
  }
}
