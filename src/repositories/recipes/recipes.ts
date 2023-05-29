import { Recipe } from "@/main/recipes/models/recipe";
import { BaseRepository } from "../_shared/base";
import { RecipeOptionDTO, RecipeQueryResult } from "@/dtos/recipes/recipe";
import { RecipesListFilters } from "@/types/recipes/recipes";
import { ITagsRepository } from "@/interfaces/_shared/tags/tagsRepository";
import { RecipesQueries } from "@/queries/recipes/recipes";
import { ListRepository } from "../_shared/list";
import { Database } from "@/config/database";
import { OkPacket } from "mysql2";

export class RecipesRepository
  extends BaseRepository<Recipe, RecipeQueryResult>
  implements ITagsRepository<RecipesListFilters>
{
  protected queries: RecipesQueries;
  list: ListRepository<RecipeQueryResult, RecipesListFilters>;

  constructor(
    database = Database.getInstance(),
    queries = new RecipesQueries(),
    list = new ListRepository<RecipeQueryResult, RecipesListFilters>(
      database,
      queries
    )
  ) {
    super(database, queries);
    this.list = list;
    this.queries = queries;
  }

  async selectAll(filters: RecipesListFilters) {
    const query = this.queries.getSelectAll(filters);
    const results = await this.database.sendQuery(query);

    return results as RecipeQueryResult[];
  }

  async selectTags(filters: RecipesListFilters) {
    const results = await this.selectAll(filters);

    return results
      .map((result) => result.tags)
      .filter((tags): tags is string => !!tags);
  }

  async selectNames(filters: RecipesListFilters) {
    const results = await this.selectAll(filters);

    return results
      .map((result) => result.recipeName)
      .filter((name): name is string => !!name);
  }

  async selectIngredientIds(filters: RecipesListFilters) {
    const results = await this.selectAll(filters);

    return results
      .map((result) => result.ingredientIds)
      .filter((ids): ids is string => !!ids);
  }

  async selectOptions() {
    const query = this.queries.getSelectOptions("recipe_name");
    const results = await this.database.sendQuery(query);

    return results as RecipeOptionDTO[];
  }

  async updateKcal(kcal: number, id: number) {
    const query = this.queries.getUpdateKcal();
    const results = await this.database.sendQuery(query, [kcal, id]);

    return results as OkPacket;
  }

  getFieldsToInsert(model: Recipe) {
    return [
      model.recipeName,
      model.preparationTime,
      model.tags,
      model.cookidooLink,
    ];
  }

  getFieldsToUpdate(model: Recipe) {
    return [
      model.recipeName,
      model.preparationTime,
      model.tags,
      model.cookedDate,
      model.cookidooLink,
      model.id,
    ];
  }
}
