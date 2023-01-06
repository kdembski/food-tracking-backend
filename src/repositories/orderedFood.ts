import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import Database from "@/config/database";
import { DatabaseQueryHelper } from "@/helpers/databaseQuery";
import { IOrderedFoodRepository } from "@/interfaces/orderedFood";
import { orderedFoodQueries } from "@/queries/orderedFood";
import { OkPacket } from "mysql2";
import { ListConfig } from "@/interfaces/base/list";
import { CustomError } from "@/base/errors/models/customError";
import { TagsConfig } from "@/interfaces/base/tags";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";

export class OrderedFoodRepository implements IOrderedFoodRepository {
  async selectById(id: number) {
    const results = await Database.sendQuery(orderedFoodQueries.selectById, [
      id,
    ]);
    const dto = results[0] as OrderedFoodDTO;

    if (!dto) {
      throw new CustomError({
        message: "Ordered food with id: '" + id + "' not exists",
      });
    }
    return dto;
  }

  async selectList(config: ListConfig) {
    const query = new DatabaseQueryHelper().extendQueryToSelectList(
      orderedFoodQueries.select,
      config,
      ["food_name", "place_name"]
    );

    const data = await Database.sendQuery(query);
    return data as OrderedFoodDTO[];
  }

  async selectTags({ searchPhrase, tags }: TagsConfig) {
    const databaseQueryHelper = new DatabaseQueryHelper();

    const queryToFilterByTags =
      databaseQueryHelper.getQueryToFiltersByTags(tags);

    const queryToFilterBySearchPhrase =
      databaseQueryHelper.getQueryToFilterBySearchPhrase(searchPhrase, [
        "food_name",
        "place_name",
      ]);

    const queryToSelectTags =
      orderedFoodQueries.selectTags +
      queryToFilterBySearchPhrase +
      queryToFilterByTags;

    const results = await Database.sendQuery(queryToSelectTags, [searchPhrase]);

    return results.map((item: { tags: string }) => item.tags) as string[];
  }

  async selectCount(searchPhrase: string, tags?: string) {
    const databaseQueryHelper = new DatabaseQueryHelper();

    const queryToFilterByTags =
      databaseQueryHelper.getQueryToFiltersByTags(tags);

    const queryToFilterBySearchPhrase =
      databaseQueryHelper.getQueryToFilterBySearchPhrase(searchPhrase, [
        "food_name",
        "place_name",
      ]);

    const queryToSelectListCount =
      orderedFoodQueries.selectCount +
      queryToFilterBySearchPhrase +
      queryToFilterByTags;

    const results = await Database.sendQuery(queryToSelectListCount);

    return parseInt(results[0].count);
  }

  async insert(data: OrderedFood) {
    const results = await Database.sendQuery(orderedFoodQueries.insert, [
      data.foodName,
      data.placeName,
      data.tags,
      data.placeLink,
    ]);

    return results as OkPacket;
  }

  async update(data: OrderedFood) {
    const results = await Database.sendQuery(orderedFoodQueries.update, [
      data.foodName,
      data.placeName,
      data.tags,
      data.placeLink,
      data.orderedDate,
      data.id,
    ]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const results = await Database.sendQuery(orderedFoodQueries.delete, [id]);
    return results as OkPacket;
  }
}
