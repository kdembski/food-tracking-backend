import Database from "@/config/database";
import { OkPacket } from "mysql2";
import { CustomError } from "@/base/errors/models/customError";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";
import { IngredientUnitQueryResult } from "@/dtos/ingredients/ingredientUnit";
import { IngredientUnitsQueries } from "@/queries/ingredients/ingredientUnits";
import { IRepository } from "@/interfaces/base/db-entity/repository";

export class IngredientUnitsRepository
  implements IRepository<IngredientUnit, IngredientUnitQueryResult>
{
  async selectById(id: number) {
    const query = new IngredientUnitsQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0];

    if (!dto) {
      throw new CustomError({
        message: "Ingredient unit with id: '" + id + "' not exists",
      });
    }

    return dto as IngredientUnitQueryResult;
  }

  async selectByIngredientId(ingredientId: number) {
    const query = new IngredientUnitsQueries().getSelectByIngredientId();
    const results = await Database.sendQuery(query, [ingredientId]);

    return results as IngredientUnitQueryResult[];
  }

  async selectByIngredientIdAndUnitId(ingredientId: number, unitId: number) {
    const query = new IngredientUnitsQueries().getSelectByIngredientIdAndUnitId(
      ingredientId,
      unitId
    );

    const results = await Database.sendQuery(query);
    return results[0] as IngredientUnitQueryResult;
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
