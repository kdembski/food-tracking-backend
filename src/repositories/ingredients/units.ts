import Database from "@/config/database";
import { OkPacket } from "mysql2";
import { CustomError } from "@/base/errors/models/customError";
import { UnitDTO, UnitOptionDTO } from "@/dtos/ingredients/unit";
import { IUnitsRepository } from "@/interfaces/ingredients/units";
import { Unit } from "@/main/ingredients/models/unit";
import { UnitsQueries } from "@/queries/ingredients/units";
import { ListConfig } from "@/types/base/list";
import { UnitsListFilters } from "@/types/ingredients/units";

export class UnitsRepository implements IUnitsRepository {
  async selectList(config: ListConfig<UnitsListFilters>) {
    const query = new UnitsQueries().getSelectList(config);
    const data = await Database.sendQuery(query);

    return data as UnitDTO[];
  }

  async selectCount(filters: UnitsListFilters) {
    const query = new UnitsQueries().getSelectCount(filters);
    const results = await Database.sendQuery(query);

    return parseInt(results[0].count);
  }

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

  async selectOptions() {
    const query = new UnitsQueries().getSelectOptions("name");
    const results = await Database.sendQuery(query);

    return results as UnitOptionDTO[];
  }

  async insert(data: Unit) {
    const query = new UnitsQueries().getInsert();
    const results = await Database.sendQuery(query, [data.name, data.shortcut]);

    return results as OkPacket;
  }

  async update(data: Unit) {
    const query = new UnitsQueries().getUpdate();
    const results = await Database.sendQuery(query, [
      data.name,
      data.shortcut,
      data.id,
    ]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const query = new UnitsQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);
    return results as OkPacket;
  }
}
