import { IIngredientUnitsRepository } from "@/interfaces/ingredients/ingredientUnits";
import Database from "@/config/database";
import { ingredientUnitsQueries } from "@/queries/ingredients/ingredientUnits";
import { OkPacket } from "mysql2";
import { CustomError } from "@/base/errors/models/customError";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";
import { IngredientUnitDTO } from "@/dtos/ingredients/ingredientUnit";

export class IngredientUnitsRepository implements IIngredientUnitsRepository {
  async selectById(id: number) {
    const results = await Database.sendQuery(
      ingredientUnitsQueries.selectById,
      [id]
    );
    const dto = results[0] as IngredientUnitDTO;

    if (!dto) {
      throw new CustomError({
        message: "Ingredient unit with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectByIngredientId(ingredientId: number) {
    const results = await Database.sendQuery(
      ingredientUnitsQueries.selectByIngredientId,
      [ingredientId]
    );

    return results as IngredientUnitDTO[];
  }

  async insert(data: IngredientUnit) {
    const results = await Database.sendQuery(ingredientUnitsQueries.insert, [
      data.ingredientId,
      data.unitId,
      data.kcalPerUnit,
      data.isPrimary,
      data.converterToPrimary,
    ]);

    return results as OkPacket;
  }

  async update(data: IngredientUnit) {
    const results = await Database.sendQuery(ingredientUnitsQueries.update, [
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
    const results = await Database.sendQuery(ingredientUnitsQueries.delete, [
      id,
    ]);
    return results as OkPacket;
  }
}
