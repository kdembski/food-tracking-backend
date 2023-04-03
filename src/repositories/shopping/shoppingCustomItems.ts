import { CustomError } from "@/base/errors/models/customError";
import Database from "@/config/database";
import {
  ShoppingCustomItemDTO,
  ShoppingCustomItemOptionDTO,
} from "@/dtos/shopping/shoppingCustomItems";
import { IShoppingCustomItemsRepository } from "@/interfaces/shopping/shopping-custom-items/shoppingCustomItemsRepository";
import { ShoppingCustomItem } from "@/main/shopping/models/shoppingCustomItem";
import { ShoppingCustomItemsQueries } from "@/queries/shopping/shoppingCustomItems";
import { OkPacket } from "mysql2";

export class ShoppingCustomItemsRepository
  implements IShoppingCustomItemsRepository
{
  async selectOptions() {
    const query = new ShoppingCustomItemsQueries().getSelectOptions("name");
    const data = await Database.sendQuery(query);

    return data as ShoppingCustomItemOptionDTO[];
  }

  async selectById(id: number) {
    const query = new ShoppingCustomItemsQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0] as ShoppingCustomItemDTO;

    if (!dto) {
      throw new CustomError({
        message: "Shopping custom item with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async insert(data: ShoppingCustomItem) {
    const query = new ShoppingCustomItemsQueries().getInsert();
    const results = await Database.sendQuery(query, [data.name]);

    return results as OkPacket;
  }

  async update(data: ShoppingCustomItem) {
    const query = new ShoppingCustomItemsQueries().getUpdate();
    const results = await Database.sendQuery(query, [data.name, data.id]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const query = new ShoppingCustomItemsQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);

    return results as OkPacket;
  }
}
