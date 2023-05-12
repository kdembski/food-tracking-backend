import Database from "@/config/database";
import { OkPacket } from "mysql2";
import { Recipe } from "@/main/recipes/models/recipe";
import { ListConfig } from "@/types/base/list";
import { CustomError } from "@/base/errors/models/customError";
import { RecipeQueryResult, RecipeOptionDTO } from "@/dtos/recipes/recipe";
import { RecipesQueries } from "@/queries/recipes/recipes";
import { RecipesListFilters } from "@/types/recipes/recipes";
import { IRepository } from "@/interfaces/base/db-entity/repository";
import { IListRepository } from "@/interfaces/base/list/listRepository";
import { ITagsRepository } from "@/interfaces/base/tags/tagsRepository";

export class RecipesRepository
  implements
    IRepository<Recipe, RecipeQueryResult>,
    IListRepository<RecipeQueryResult, RecipesListFilters>,
    ITagsRepository<RecipesListFilters>
{
  async selectById(id: number) {
    const query = new RecipesQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0] as RecipeQueryResult;

    if (!dto) {
      throw new CustomError({
        message: "Recipe with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectList(config: ListConfig<RecipesListFilters>) {
    const query = new RecipesQueries().getSelectList(config);
    const data = await Database.sendQuery(query);

    return data as RecipeQueryResult[];
  }

  async selectAll(filters: RecipesListFilters) {
    const query = new RecipesQueries().getSelectAll(filters);
    const results = await Database.sendQuery(query);

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

  async selectCount(filters: RecipesListFilters) {
    const query = new RecipesQueries().getSelectCount(filters);
    const results = await Database.sendQuery(query);

    return parseInt(results[0].count);
  }

  async selectOptions() {
    const query = new RecipesQueries().getSelectOptions("recipe_name");
    const results = await Database.sendQuery(query);

    return results as RecipeOptionDTO[];
  }

  async insert(data: Recipe) {
    const query = new RecipesQueries().getInsert();
    const results = await Database.sendQuery(query, [
      data.recipeName,
      data.preparationTime,
      data.tags,
      data.cookidooLink,
    ]);

    return results as OkPacket;
  }

  async update(data: Recipe) {
    const query = new RecipesQueries().getUpdate();
    const results = await Database.sendQuery(query, [
      data.recipeName,
      data.preparationTime,
      data.tags,
      data.cookedDate,
      data.cookidooLink,
      data.id,
    ]);

    return results as OkPacket;
  }

  async updateKcal(kcal: number, id: number) {
    const query = new RecipesQueries().getUpdateKcal();
    const results = await Database.sendQuery(query, [kcal, id]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const query = new RecipesQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);

    return results as OkPacket;
  }
}
