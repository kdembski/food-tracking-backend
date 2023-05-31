import { RecipeQueryResult } from "@/dtos/recipes/recipe";
import { RecipeBuilder } from "./../builders/recipe";
import { Recipe } from "./recipe";
import { RecipesListFilters } from "@/types/recipes/recipes";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { List } from "@/main/_shared/list/models/list";
import lodash from "lodash";

export class RecipesList extends List<
  Recipe,
  RecipeQueryResult,
  RecipesListFilters
> {
  private builder: RecipeBuilder;

  constructor(builder = new RecipeBuilder()) {
    super();
    this.builder = builder;
  }

  async createListItem(data: RecipeQueryResult) {
    const builder = lodash.clone(this.builder);
    builder.recipe = new Recipe(data);
    await builder.produceDatesFromLastYear();
    return builder.recipe;
  }

  createFilters(query: RequestQueryHelper) {
    const { searchPhrase, tags, ingredientIds } = query;
    return { searchPhrase, tags, ingredientIds };
  }
}
