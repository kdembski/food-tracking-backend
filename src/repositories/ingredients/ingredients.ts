import { IngredientsQueries } from "@/queries/ingredients/ingredients";
import { CustomError } from "@/base/errors/models/customError";
import Database from "@/config/database";
import {
  IngredientOptionDTO,
  IngredientQueryResult,
} from "@/dtos/ingredients/ingredient";
import { ListConfig } from "@/types/base/list";
import { Ingredient } from "@/main/ingredients/models/ingredient";
import { OkPacket } from "mysql2";

export class IngredientsRepository {
  async selectById(id: number) {
    const query = new IngredientsQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0] as IngredientQueryResult;

    if (!dto) {
      throw new CustomError({
        message: "Ingredient with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectList(config: ListConfig) {
    const query = new IngredientsQueries().getSelectList(config);
    const data = await Database.sendQuery(query);

    return data as IngredientQueryResult[];
  }

  async selectOptions() {
    const query = new IngredientsQueries().getSelectOptions("name");
    const data = await Database.sendQuery(query);

    return data as IngredientOptionDTO[];
  }

  async selectCount(searchPhrase: string, tags: string) {
    const query = new IngredientsQueries().getSelectCount(searchPhrase, tags);
    const results = await Database.sendQuery(query);

    return parseInt(results[0].count);
  }

  async insert(data: Ingredient) {
    const query = new IngredientsQueries().getInsert();
    const results = await Database.sendQuery(query, [
      data.name,
      data.categoryId,
    ]);

    return results as OkPacket;
  }

  async update(data: Ingredient) {
    const query = new IngredientsQueries().getUpdate();
    const results = await Database.sendQuery(query, [
      data.name,
      data.categoryId,
      data.id,
    ]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const query = new IngredientsQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);
    return results as OkPacket;
  }
}
