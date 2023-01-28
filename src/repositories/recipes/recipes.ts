import { OkPacket } from "mysql2";
import { IRecipesRepository } from "@/interfaces/recipes/recipes";
import Database from "@/config/database";
import { Recipe } from "@/main/recipes/models/recipe";
import { ListConfig } from "@/types/base/list";
import { CustomError } from "@/base/errors/models/customError";
import { TagsConfig } from "@/types/base/tags";
import { ExtendedRecipeDTO } from "@/dtos/recipes/recipe";
import { RecipesQueries } from "@/queries/recipes/recipes";

export class RecipesRepository implements IRecipesRepository {
  async selectById(id: number) {
    const query = new RecipesQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0] as ExtendedRecipeDTO;

    if (!dto) {
      throw new CustomError({
        message: "Recipe with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectList(config: ListConfig) {
    const query = new RecipesQueries().getSelectList(config);
    const data = await Database.sendQuery(query);

    return data as ExtendedRecipeDTO[];
  }

  async selectTags(config: TagsConfig) {
    const query = new RecipesQueries().getSelectTags(config);
    const results = await Database.sendQuery(query);

    return results.map((item: { tags: string }) => item.tags) as string[];
  }

  async selectCount(searchPhrase: string, tags: string) {
    const query = new RecipesQueries().getSelectCount(searchPhrase, tags);
    const results = await Database.sendQuery(query);

    return parseInt(results[0].count);
  }

  async selectNames(searchPhrase: string, tags: string) {
    const query = new RecipesQueries().getSelectNames(searchPhrase, tags);
    const results = await Database.sendQuery(query);

    return results.map(
      (item: { recipeName: string }) => item.recipeName
    ) as string[];
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

  async delete(id: number) {
    const query = new RecipesQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);

    return results as OkPacket;
  }
}
