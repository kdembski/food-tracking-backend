import { IngredientsListFilters } from "@/types/ingredients/ingredients";
import { Field } from "../_shared/models/field";
import { Join } from "../_shared/models/join";
import { Queries } from "../_shared/models/queries";
import { ListConfig } from "@/types/_shared/list";
import { ListQueryBuilder } from "../_shared/builders/list";
import { WhereOperators } from "@/types/_shared/queries";

export class IngredientsQueries extends Queries {
  constructor() {
    const joins = [
      new Join({
        table: "ingredient_categories",
        on: "ingredients.category_id",
        equals: "id",
      }),
    ];

    const fieldsToSelect = [
      new Field({
        table: "ingredients",
        name: "*",
      }),
      new Field({
        table: "ingredient_categories",
        name: "name",
        alias: "category_name",
      }),
    ];

    const fieldsToInsert = ["name", "category_id"];
    const fieldsToUpdate = ["name", "category_id"];

    super({
      tableName: "ingredients",
      joins,
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
    });
  }

  getSelectList(config: ListConfig<IngredientsListFilters>) {
    const { filters } = config;
    const queryBuilder = this.getListQueryBuilderWithFilters(filters);
    queryBuilder.build(config);

    return queryBuilder.query;
  }

  getSelectAll(filters: IngredientsListFilters) {
    return this.getListQueryBuilderWithFilters(filters).query;
  }

  getSelectCount(filters: IngredientsListFilters) {
    return `SELECT COUNT(*) FROM (${this.getSelectAll(
      filters
    )}) AS ingredients`;
  }

  private getListQueryBuilderWithFilters(filters: IngredientsListFilters) {
    const queryBuilder = new ListQueryBuilder(this.getSelect());
    const { searchPhrase } = filters;
    queryBuilder.produceMultipleFieldsFilterWheres(
      ["ingredients.name"],
      searchPhrase,
      WhereOperators.OR
    );
    queryBuilder.produceFilterWheres();

    return queryBuilder;
  }
}
