import { ExtendedRecipeDTO, RecipeQueryResult } from "@/dtos/recipes/recipe";
import { RecipeBuilder } from "./../builders/recipe";
import { Recipe } from "./recipe";
import { RecipesRepository } from "@/repositories/recipes/recipes";
import { RecipesListFilters } from "@/types/recipes/recipes";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { List } from "@/main/_shared/list/models/list";
import lodash from "lodash";
import { ExtendedRecipeMapper } from "@/mappers/recipes/extendedRecipe";

export class RecipesList extends List<
  Recipe,
  ExtendedRecipeDTO,
  RecipeQueryResult,
  RecipesListFilters
> {
  private builder: RecipeBuilder;

  constructor(
    repository = new RecipesRepository(),
    mapper = new ExtendedRecipeMapper(),
    builder = new RecipeBuilder()
  ) {
    super(repository.list, mapper);
    this.builder = builder;
  }

  async createListItem(data: ExtendedRecipeDTO) {
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
