import Database from "@/config/database";
import { OkPacket } from "mysql2";
import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { IOrderedFoodRepository } from "@/interfaces/orderedFood";
import { ListConfig } from "@/types/base/list";
import { CustomError } from "@/base/errors/models/customError";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { OrderedFoodQueries } from "@/queries/orderedFood";
import { OrderedFoodListFilters } from "@/types/ordered-food/orderedFood";

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

  async selectList(config: ListConfig<OrderedFoodListFilters>) {
    const query = new OrderedFoodQueries().getSelectList(config);
    const data = await Database.sendQuery(query);

    return data as OrderedFoodDTO[];
  }

  async selectAll(filters: OrderedFoodListFilters) {
    const query = new OrderedFoodQueries().getSelectAll(filters);
    const results = await Database.sendQuery(query);

    return results as OrderedFoodDTO[];
  }

  async selectTags(filters: OrderedFoodListFilters) {
    const results = await this.selectAll(filters);

    return results
      .map((result) => result.tags)
      .filter((tags): tags is string => !!tags);
  }

  async selectCount(filters: OrderedFoodListFilters) {
    const query = new OrderedFoodQueries().getSelectCount(filters);
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
