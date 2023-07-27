import { IngredientsListFilters } from "@/types/ingredients/ingredients";
import { WhereOperators } from "@/types/_shared/queries";
import { ListConfig } from "@/types/_shared/list";
import { SelectListQuery } from "../_shared/models/list/selectList";
import { SelectCountQuery } from "../_shared/models/list/selectCount";
import { SelectQuery } from "../_shared/models/select";
import { CRUDQueries } from "../_shared/crud";
import { Join } from "../_shared/components/models/join";
import { Field } from "../_shared/components/models/field";
import { WheresGenerator } from "../_shared/components/generators/wheres";

export class IngredientsQueries extends CRUDQueries {
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

    super("ingredients", fieldsToSelect, fieldsToInsert, fieldsToUpdate, joins);
  }

  getSelectList(config: ListConfig<IngredientsListFilters>) {
    const { filters } = config;
    return new SelectListQuery(this.getSelectAll(filters), config).query;
  }

  getSelectCount(filters: IngredientsListFilters) {
    return new SelectCountQuery(this.getSelectAll(filters)).query;
  }

  private getSelectAll(filters: IngredientsListFilters) {
    const { searchPhrase } = filters;

    return new SelectQuery(
      this.tableName,
      this.fieldsToSelect,
      new WheresGenerator().generateMultipleFields(
        ["ingredients.name"],
        searchPhrase,
        WhereOperators.OR
      ),
      this.joins
    ).query;
  }

  getSelectOptions() {
    return new SelectQuery(this.tableName, [
      new Field({ name: "id" }),
      new Field({ name: "name" }),
    ]).query;
  }
}
