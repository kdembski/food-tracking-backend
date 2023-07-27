import { UnitsListFilters } from "@/types/ingredients/units";
import { WhereOperators } from "@/types/_shared/queries";
import { Field } from "../_shared/components/models/field";
import { CRUDQueries } from "../_shared/crud";
import { SelectListQuery } from "../_shared/models/list/selectList";
import { SelectCountQuery } from "../_shared/models/list/selectCount";
import { ListConfig } from "@/types/_shared/list";
import { SelectQuery } from "../_shared/models/select";
import { WheresGenerator } from "../_shared/components/generators/wheres";

export class UnitsQueries extends CRUDQueries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = ["name", "shortcut"];
    const fieldsToUpdate = ["name", "shortcut"];

    super("units", fieldsToSelect, fieldsToInsert, fieldsToUpdate);
  }

  getSelectList(config: ListConfig<UnitsListFilters>) {
    const { filters } = config;
    return new SelectListQuery(this.getSelectAll(filters), config).query;
  }

  getSelectCount(filters: UnitsListFilters) {
    return new SelectCountQuery(this.getSelectAll(filters)).query;
  }

  private getSelectAll(filters: UnitsListFilters) {
    const { searchPhrase } = filters;

    return new SelectQuery(
      this.tableName,
      this.fieldsToSelect,
      new WheresGenerator().generateMultipleFields(
        ["name"],
        searchPhrase,
        WhereOperators.OR
      )
    ).query;
  }

  getSelectOptions() {
    return new SelectQuery(this.tableName, [
      new Field({ name: "id" }),
      new Field({ name: "name" }),
    ]).query;
  }
}
