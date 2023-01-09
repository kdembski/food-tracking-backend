import { CustomError } from "@/base/errors/models/customError";
import Database from "@/config/database";
import {
  IngredientDTO,
  IngredientOptionDTO,
  IngredientQueryResult,
} from "@/dtos/ingredients/ingredient";
import { DatabaseQueryHelper } from "@/helpers/databaseQuery";
import { ListConfig } from "@/types/base/list";
import { Ingredient } from "@/main/ingredients/models/ingredient";
import { ingredientsQueries } from "@/queries/ingredients/ingredients";
import { OkPacket } from "mysql2";

export class IngredientsRepository {
  async selectById(id: number) {
    const results = await Database.sendQuery(ingredientsQueries.selectById, [
      id,
    ]);
    const dto = results[0] as IngredientQueryResult;

    if (!dto) {
      throw new CustomError({
        message: "Ingredient with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectList(config: ListConfig) {
    const query = new DatabaseQueryHelper().extendQueryToSelectList(
      ingredientsQueries.select,
      config
    );

    const data = await Database.sendQuery(query, [config.searchPhrase]);
    return data as IngredientQueryResult[];
  }

  async selectOptions() {
    const data = await Database.sendQuery(ingredientsQueries.selectOptions);
    return data as IngredientOptionDTO[];
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
