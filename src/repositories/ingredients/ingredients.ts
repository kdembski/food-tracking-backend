import Database from "@/config/database";
import { DatabaseQueryHelper } from "@/helpers/databaseQuery";
import { ListConfig } from "@/interfaces/base/list";
import { IngredientDTO } from "@/interfaces/ingredients/ingredients";
import { CustomError } from "@/models/errors/customError";
import { Ingredient } from "@/models/ingredients/ingredient";
import { ingredientsQueries } from "@/queries/ingredients/ingredients";
import { OkPacket } from "mysql2";

export class IngredientsRepository {
  async selectById(id: number) {
    const results = await Database.sendQuery(ingredientsQueries.selectById, [
      id,
    ]);
    const dto = results[0] as IngredientDTO;

    if (!dto) {
      throw new CustomError({
        message: "Recipe with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectList(config: ListConfig) {
    const query = new DatabaseQueryHelper().extendQueryToSelectList(
      ingredientsQueries.select,
      config.sortAttribute,
      config.sortDirection,
      config.tags,
      config.size,
      config.offset
    );

    const data = await Database.sendQuery(query, [config.searchPhrase]);
    return data as IngredientDTO[];
  }

  async selectCount(searchPhrase: string, tags?: string) {
    const queryToSelectListCount =
      ingredientsQueries.selectCount +
      "\n" +
      new DatabaseQueryHelper().getQueryToFiltersByTags(tags);

    const results = await Database.sendQuery(queryToSelectListCount, [
      searchPhrase,
    ]);

    return parseInt(results[0].count);
  }

  async insert(data: Ingredient) {
    const results = await Database.sendQuery(ingredientsQueries.insert, [
      data.name,
      data.categoryId,
    ]);

    return results as OkPacket;
  }

  async update(data: Ingredient) {
    const results = await Database.sendQuery(ingredientsQueries.update, [
      data.name,
      data.categoryId,
      data.id,
    ]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const results = await Database.sendQuery(ingredientsQueries.delete, [id]);
    return results as OkPacket;
  }
}
