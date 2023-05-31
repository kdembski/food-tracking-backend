import { UnitDTO } from "@/dtos/ingredients/unit";
import { Unit } from "./unit";
import { UnitsListFilters } from "@/types/ingredients/units";
import { List } from "@/main/_shared/list/models/list";
import { RequestQueryHelper } from "@/helpers/requestQuery";

export class UnitsList extends List<Unit, UnitDTO, UnitsListFilters> {
  async createListItem(data: UnitDTO) {
    return new Unit(data);
  }

  createFilters(query: RequestQueryHelper) {
    const { searchPhrase } = query;
    return { searchPhrase };
  }
}
