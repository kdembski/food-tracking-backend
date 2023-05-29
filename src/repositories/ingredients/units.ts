import { Unit } from "@/main/ingredients/models/unit";
import { CRUDRepository } from "../_shared/crud";
import { UnitDTO, UnitOptionDTO } from "@/dtos/ingredients/unit";
import { UnitsQueries } from "@/queries/ingredients/units";
import { ListRepository } from "../_shared/list";
import { UnitsListFilters } from "@/types/ingredients/units";
import { Database } from "@/config/database";

export class UnitsRepository extends CRUDRepository<Unit, UnitDTO> {
  protected queries: UnitsQueries;
  list: ListRepository<UnitDTO, UnitsListFilters>;

  constructor(
    database = Database.getInstance(),
    queries = new UnitsQueries(),
    list = new ListRepository<UnitDTO, UnitsListFilters>(database, queries)
  ) {
    super(database, queries);
    this.list = list;
    this.queries = queries;
  }

  async selectOptions() {
    const query = this.queries.getSelectOptions("name");
    const results = await this.database.sendQuery(query);

    return results as UnitOptionDTO[];
  }

  getFieldsToInsert(model: Unit) {
    return [model.name, model.shortcut];
  }

  getFieldsToUpdate(model: Unit) {
    return [model.name, model.shortcut, model.id];
  }
}
