import { IIngredientUnitsRepository } from "@/interfaces/ingredients/ingredientUnits";
import Database from "@/config/database";
import { OkPacket } from "mysql2";
import { CustomError } from "@/base/errors/models/customError";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";
import { IngredientUnitDTO } from "@/dtos/ingredients/ingredientUnit";
import { IngredientUnitsQueries } from "@/queries/ingredients/ingredientUnits";

export class IngredientUnitsRepository implements IIngredientUnitsRepository {
  async selectById(id: number) {
    const query = new IngredientUnitsQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0] as IngredientUnitDTO;

    if (!dto) {
      throw new CustomError({
        message: "Ingredient unit with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectByIngredientId(ingredientId: number) {
    const query = new IngredientUnitsQueries().getSelectByIngredientId();
    const results = await Database.sendQuery(query, [ingredientId]);

    return results as IngredientUnitDTO[];
  }

  async insert(data: IngredientUnit) {
    const query = new IngredientUnitsQueries().getInsert();
    const results = await Database.sendQuery(query, [
      data.ingredientId,
      data.unitId,
      data.kcalPerUnit,
      data.isPrimary,
      data.converterToPrimary,
    ]);

    return results as OkPacket;
  }

  async update(data: IngredientUnit) {
    const query = new IngredientUnitsQueries().getUpdate();
    const results = await Database.sendQuery(query, [
      data.ingredientId,
      data.unitId,
      data.kcalPerUnit,
      data.isPrimary,
      data.converterToPrimary,
      data.id,
    ]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const query = new IngredientUnitsQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);
    return results as OkPacket;
  }
}
