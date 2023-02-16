import { List } from "@/base/list/models/list";
import { UnitDTO } from "@/dtos/ingredients/unit";
import { UnitMapper } from "@/mappers/ingredients/unit";
import { UnitsRepository } from "@/repositories/ingredients/units";
import { Unit } from "./unit";

export class UnitsList extends List<Unit, UnitDTO, UnitDTO> {
  constructor() {
    super(new UnitsRepository(), new UnitMapper());
  }

  async createListItem(data: UnitDTO) {
    return new Unit(data);
  }
}
