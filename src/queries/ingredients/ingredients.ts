import { Queries } from "@/base/queries/queries";
import { Field } from "@/base/queries/models/field";
import { Join } from "@/base/queries/models/join";
import { IngredientsListFilters } from "@/types/ingredients/ingredients";
import { ListConfig } from "@/types/base/list";
import { WhereOperators } from "@/types/base/queries";
import { ListQueryBuilder } from "@/base/queries/builders/list";

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
