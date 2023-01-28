import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import Database from "@/config/database";
import { IOrderedFoodRepository } from "@/interfaces/orderedFood";
import { OkPacket } from "mysql2";
import { ListConfig } from "@/types/base/list";
import { CustomError } from "@/base/errors/models/customError";
import { TagsConfig } from "@/types/base/tags";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { OrderedFoodQueries } from "@/queries/orderedFood";

export class OrderedFoodRepository implements IOrderedFoodRepository {
  async selectById(id: number) {
    const query = new OrderedFoodQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0] as OrderedFoodDTO;

    if (!dto) {
      throw new CustomError({
        message: "Ordered food with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectList(config: ListConfig) {
    const query = new OrderedFoodQueries().getSelectList(config);
    const data = await Database.sendQuery(query);

    return data as OrderedFoodDTO[];
  }

  async selectTags(config: TagsConfig) {
    const query = new OrderedFoodQueries().getSelectTags(config);
    const results = await Database.sendQuery(query);

    return results.map((item: { tags: string }) => item.tags) as string[];
  }

  async selectCount(searchPhrase: string, tags: string) {
    const query = new OrderedFoodQueries().getSelectCount(searchPhrase, tags);
    const results = await Database.sendQuery(query);

    return parseInt(results[0].count);
  }

  async insert(data: OrderedFood) {
    const query = new OrderedFoodQueries().getInsert();
    const results = await Database.sendQuery(query, [
      data.foodName,
      data.placeName,
      data.tags,
      data.placeLink,
    ]);

    return results as OkPacket;
  }

  async update(data: OrderedFood) {
    const query = new OrderedFoodQueries().getUpdate();
    const results = await Database.sendQuery(query, [
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
    const query = new OrderedFoodQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);

    return results as OkPacket;
  }
}
