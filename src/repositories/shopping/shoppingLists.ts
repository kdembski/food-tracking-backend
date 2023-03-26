import { CustomError } from "@/base/errors/models/customError";
import Database from "@/config/database";
import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";
import { IShoppingListsRepository } from "@/interfaces/shopping/shopping-lists/shoppingListsRepository";
import { ShoppingList } from "@/main/shopping/models/shoppingList";
import { ShoppingListsQueries } from "@/queries/shopping/shoppingLists";
import { OkPacket } from "mysql2";

export class ShoppingListsRepository implements IShoppingListsRepository {
  async selectById(id: number) {
    const query = new ShoppingListsQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0] as ShoppingListDTO;

    if (!dto) {
      throw new CustomError({
        message: "Shopping list with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectAll() {
    const query = new ShoppingListsQueries().getSelect();
    const data = await Database.sendQuery(query);

    return data as ShoppingListDTO[];
  }

  async insert(data: ShoppingList) {
    const query = new ShoppingListsQueries().getInsert();
    const results = await Database.sendQuery(query, [data.name]);

    return results as OkPacket;
  }

  async update(data: ShoppingList) {
    const query = new ShoppingListsQueries().getUpdate();
    const results = await Database.sendQuery(query, [data.name, data.id]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const query = new ShoppingListsQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);

    return results as OkPacket;
  }
}
