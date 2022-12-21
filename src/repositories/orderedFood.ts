import { OrderedFood } from "@/models/ordered-food/orderedFood";
import Database from "@/config/database";
import { DatabaseQueryHelper } from "@/helpers/databaseQuery";
import {
  IOrderedFoodRepository,
  OrderedFoodDTO,
} from "@/interfaces/orderedFood";
import { orderedFoodQueries } from "@/queries/orderedFood";
import { OkPacket } from "mysql2";
import { CustomError } from "@/models/errors/customError";
import { ListConfig } from "@/interfaces/base/models/list";

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
      config.sortAttribute,
      config.sortDirection,
      config.tags,
      config.size,
      config.offset
    );

    const data = await Database.sendQuery(query, [config.searchPhrase]);
    return data as OrderedFoodDTO[];
  }

  async selectTags(searchPhrase: string, tags?: string) {
    const queryToFilterByTags =
      new DatabaseQueryHelper().getQueryToFiltersByTags(tags);
    const queryToSelectTags =
      orderedFoodQueries.selectTags + "\n" + queryToFilterByTags;

    const results = await Database.sendQuery(queryToSelectTags, [searchPhrase]);

    return results.map((item: { tags: string }) => item.tags) as string[];
  }

  async selectCount(searchPhrase: string, tags?: string) {
    const queryToSelectListCount =
      orderedFoodQueries.selectCount +
      "\n" +
      new DatabaseQueryHelper().getQueryToFiltersByTags(tags);

    const results = await Database.sendQuery(queryToSelectListCount, [
      searchPhrase,
    ]);

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
