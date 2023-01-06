import { CustomError } from "@/base/errors/models/customError";
import Database from "@/config/database";
import { UnitDTO, UnitOptionDTO } from "@/dtos/ingredients/unit";
import { IUnitsRepository } from "@/interfaces/ingredients/units";
import { Unit } from "@/main/ingredients/models/unit";
import { unitsQueries } from "@/queries/ingredients/units";
import { OkPacket } from "mysql2";

export class UnitsRepository implements IUnitsRepository {
  async selectById(id: number) {
    const results = await Database.sendQuery(unitsQueries.selectById, [id]);
    const dto = results[0] as UnitDTO;

    if (!dto) {
      throw new CustomError({
        message: "Ingredient category with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectAll() {
    const results = await Database.sendQuery(unitsQueries.select);

    return results as UnitDTO[];
  }

  async selectOptions() {
    const results = await Database.sendQuery(unitsQueries.selectOptions);

    return results as UnitOptionDTO[];
  }

  async insert(data: Unit) {
    const results = await Database.sendQuery(unitsQueries.insert, [data.name]);

    return results as OkPacket;
  }

  async update(data: Unit) {
    const results = await Database.sendQuery(unitsQueries.update, [
      data.name,
      data.id,
    ]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const results = await Database.sendQuery(unitsQueries.delete, [id]);
    return results as OkPacket;
  }
}
