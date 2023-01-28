import { CustomError } from "@/base/errors/models/customError";
import Database from "@/config/database";
import { UnitDTO, UnitOptionDTO } from "@/dtos/ingredients/unit";
import { IUnitsRepository } from "@/interfaces/ingredients/units";
import { Unit } from "@/main/ingredients/models/unit";
import { UnitsQueries } from "@/queries/ingredients/units";
import { OkPacket } from "mysql2";

export class UnitsRepository implements IUnitsRepository {
  async selectById(id: number) {
    const query = new UnitsQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0] as UnitDTO;

    if (!dto) {
      throw new CustomError({
        message: "Ingredient category with id: '" + id + "' not exists",
      });
    }

    return dto;
  }

  async selectAll() {
    const query = new UnitsQueries().getSelect();
    const results = await Database.sendQuery(query);

    return results as UnitDTO[];
  }

  async selectOptions() {
    const query = new UnitsQueries().getSelectOptions("name");
    const results = await Database.sendQuery(query);

    return results as UnitOptionDTO[];
  }

  async insert(data: Unit) {
    const query = new UnitsQueries().getInsert();
    const results = await Database.sendQuery(query, [data.name]);

    return results as OkPacket;
  }

  async update(data: Unit) {
    const query = new UnitsQueries().getUpdate();
    const results = await Database.sendQuery(query, [data.name, data.id]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const query = new UnitsQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);
    return results as OkPacket;
  }
}
