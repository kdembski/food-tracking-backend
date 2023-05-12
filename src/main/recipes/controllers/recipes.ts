import { RecipeBuilder } from "./../builders/recipe";
import { RecipesRepository } from "@/repositories/recipes/recipes";
import { Recipe } from "@/main/recipes/models/recipe";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { RecipesList } from "../models/recipesList";
import { TagsBuilder } from "@/base/tags/builders/tags";
import { RecipesListFilters } from "@/types/recipes/recipes";
import { ListBuilder } from "@/base/list/builders/list";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { IDbEntityController } from "@/interfaces/base/db-entity/dbEntityController";

export class RecipesController implements IDbEntityController<Recipe> {
  async getList(query: RequestQueryData) {
    const { searchPhrase, tags, ingredientIds } = new RequestQueryHelper(query);
    const recipesList = new RecipesList();
    const listBuilder = new ListBuilder(recipesList);
    await listBuilder.build(query, { searchPhrase, tags, ingredientIds });

    return recipesList;
  }

  async getTags(filters: RecipesListFilters) {
    const tagsBuilder = new TagsBuilder(new RecipesRepository());
    await tagsBuilder.build(filters);

    return tagsBuilder.tags;
  }

  getNames(filters: RecipesListFilters) {
    return new RecipesRepository().selectNames(filters);
  }

  getCount(filters: RecipesListFilters) {
    return new RecipesRepository().selectCount(filters);
  }

  getOptions() {
    return new RecipesRepository().selectOptions();
  }

  async getById(id: number) {
    const dto = await new RecipesRepository().selectById(id);
    const builder = new RecipeBuilder(dto);
    await builder.produceDatesFromLastYear();
    return builder.getRecipe();
  }

  create(recipe: Recipe) {
    return new RecipesRepository().insert(recipe);
  }

  update(recipe: Recipe) {
    return new RecipesRepository().update(recipe);
  }

  updateKcal(kcal: number, id: number) {
    return new RecipesRepository().updateKcal(kcal, id);
  }

  delete(id: number) {
    return new RecipesRepository().delete(id);
  }
}
