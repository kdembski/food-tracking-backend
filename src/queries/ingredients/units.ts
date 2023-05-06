import { Queries } from "@/base/queries/queries";
import { Field } from "@/base/queries/models/field";
import { UnitsListFilters } from "@/types/ingredients/units";
import { ListConfig } from "@/types/base/list";
import { ListQueryBuilder } from "@/base/queries/builders/list";
import { WhereOperators } from "@/types/base/queries";

export class UnitsQueries extends Queries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = ["name", "shortcut"];
    const fieldsToUpdate = ["name", "shortcut"];

    super({
      tableName: "units",
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
    });
  }

  getSelectList(config: ListConfig<UnitsListFilters>) {
    const { filters } = config;
    const queryBuilder = this.getListQueryBuilderWithFilters(filters);
    queryBuilder.build(config);

    return queryBuilder.query;
  }

  getSelectAll(filters: UnitsListFilters) {
    return this.getListQueryBuilderWithFilters(filters).query;
  }

  getSelectCount(filters: UnitsListFilters) {
    return `SELECT COUNT(*) FROM (${this.getSelectAll(filters)}) AS units`;
  }

  private getListQueryBuilderWithFilters(filters: UnitsListFilters) {
    const queryBuilder = new ListQueryBuilder(this.getSelect());
    const { searchPhrase } = filters;
    queryBuilder.produceMultipleFieldsFilterWheres(
      ["name"],
      searchPhrase,
      WhereOperators.OR
    );
    queryBuilder.produceFilterWheres();

    return queryBuilder;
  }
}
