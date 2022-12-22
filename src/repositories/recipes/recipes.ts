import { OkPacket } from "mysql2";
import { recipesQueries } from "@/queries/recipes/recipes";
import { RecipeDTO, IRecipesRepository } from "@/interfaces/recipes/recipes";
import Database from "@/config/database";
import { Recipe } from "@/models/recipes/recipe";
import { DatabaseQueryHelper } from "@/helpers/databaseQuery";
import { CustomError } from "@/models/errors/customError";
import { ListConfig } from "@/interfaces/base/list";

export class RecipesRepository implements IRecipesRepository {
  async selectById(id: number) {
    const results = await Database.sendQuery(recipesQueries.selectById, [id]);
    const dto = results[0] as RecipeDTO;

    if (!dto) {
      throw new CustomError({
        message: "Recipe with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectList(config: ListConfig) {
    const query = new DatabaseQueryHelper().extendQueryToSelectList(
      recipesQueries.select,
      config
    );

    const data = await Database.sendQuery(query, [config.searchPhrase]);
    return data as RecipeDTO[];
  }

  async selectTags(searchPhrase: string, tags?: string) {
    const queryToFilterByTags =
      new DatabaseQueryHelper().getQueryToFiltersByTags(tags);
    const queryToSelectTags =
      recipesQueries.selectTags + "\n" + queryToFilterByTags;

    const results = await Database.sendQuery(queryToSelectTags, [searchPhrase]);

    return results.map((item: { tags: string }) => item.tags) as string[];
  }

  async selectCount(searchPhrase: string, tags?: string) {
    const queryToSelectListCount =
      recipesQueries.selectCount +
      "\n" +
      new DatabaseQueryHelper().getQueryToFiltersByTags(tags);

    const results = await Database.sendQuery(queryToSelectListCount, [
      searchPhrase,
    ]);

    return parseInt(results[0].count);
  }

  async selectNames(searchPhrase: string, tags?: string) {
    const queryToSelectRecipesNames =
      recipesQueries.selectNames +
      "\n" +
      new DatabaseQueryHelper().getQueryToFiltersByTags(tags);

    const results = await Database.sendQuery(queryToSelectRecipesNames, [
      searchPhrase,
    ]);

    return results.map(
      (item: { recipeName: string }) => item.recipeName
    ) as string[];
  }

  async insert(data: Recipe) {
    const results = await Database.sendQuery(recipesQueries.insert, [
      data.recipeName,
      data.preparationTime,
      data.tags,
      data.cookidooLink,
    ]);

    return results as OkPacket;
  }

  async update(data: Recipe) {
    const results = await Database.sendQuery(recipesQueries.update, [
      data.recipeName,
      data.preparationTime,
      data.tags,
      data.cookedDate,
      data.cookidooLink,
      data.id,
    ]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const results = await Database.sendQuery(recipesQueries.delete, [id]);
    return results as OkPacket;
  }
}
