import { OrderedFoodListFilters } from "@/types/ordered-food/orderedFood";
import { WhereOperators } from "@/types/_shared/queries";
import { CRUDQueries } from "../_shared/crud";
import { Field } from "../_shared/components/models/field";
import { SelectListQuery } from "../_shared/models/list/selectList";
import { SelectCountQuery } from "../_shared/models/list/selectCount";
import { SelectQuery } from "../_shared/models/select";
import { WheresGenerator } from "../_shared/components/generators/wheres";
import { ListConfig } from "@/types/_shared/list";

export class OrderedFoodQueries extends CRUDQueries {
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

    super("ordered_food", fieldsToSelect, fieldsToInsert, fieldsToUpdate);
  }

  getSelectList(config: ListConfig<OrderedFoodListFilters>) {
    const { filters } = config;
    return new SelectListQuery(this.getSelectAll(filters), config).query;
  }

  getSelectCount(filters: OrderedFoodListFilters) {
    return new SelectCountQuery(this.getSelectAll(filters)).query;
  }

  getSelectAll(filters: OrderedFoodListFilters) {
    return new SelectQuery(
      this.tableName,
      this.fieldsToSelect,
      this.getFiltersWheres(filters)
    ).query;
  }

  private getFiltersWheres(filters: OrderedFoodListFilters) {
    const { searchPhrase, tags } = filters;
    const tagsWheres = new WheresGenerator().generateMultipleValues(
      tags,
      "tags",
      WhereOperators.AND
    );
    const searchPhraseWheres = new WheresGenerator().generateMultipleFields(
      ["food_name", "place_name"],
      searchPhrase,
      WhereOperators.OR
    );

    return [...tagsWheres, WhereOperators.AND, ...searchPhraseWheres];
  }
}
