import { ListQueryBuilder } from "@/base/queries/builders/list";
import { Field } from "@/base/queries/models/field";
import { Queries } from "@/base/queries/queries";
import { ListConfig } from "@/types/base/list";
import { WhereOperators } from "@/types/base/queries";
import { OrderedFoodListFilters } from "@/types/ordered-food/orderedFood";

export class OrderedFoodQueries extends Queries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = ["food_name", "place_name", "tags", "place_link"];
    const fieldsToUpdate = [
      "food_name",
      "place_name",
      "tags",
      "place_link",
      "order_date",
    ];

    super({
      tableName: "ordered_food",
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
    });
  }

  getSelectList(config: ListConfig<OrderedFoodListFilters>) {
    const { filters } = config;
    const queryBuilder = this.getListQueryBuilderWithFilters(filters);
    queryBuilder.build(config);

    return queryBuilder.query;
  }

  getSelectAll(filters: OrderedFoodListFilters) {
    return this.getListQueryBuilderWithFilters(filters).query;
  }

  getSelectCount(filters: OrderedFoodListFilters) {
    return `SELECT COUNT(*) FROM (${this.getSelectAll(
      filters
    )}) AS ordered_food`;
  }

  private getListQueryBuilderWithFilters(filters: OrderedFoodListFilters) {
    const queryBuilder = new ListQueryBuilder(this.getSelect());
    const { searchPhrase, tags } = filters;

    queryBuilder.produceMultipleValuesFilterWheres(
      "tags",
      tags,
      WhereOperators.AND
    );
    queryBuilder.produceMultipleFieldsFilterWheres(
      ["food_name", "place_name"],
      searchPhrase,
      WhereOperators.OR
    );
    queryBuilder.produceFilterWheres();

    return queryBuilder;
  }
}
