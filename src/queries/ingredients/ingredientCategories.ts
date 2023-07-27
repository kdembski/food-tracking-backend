import { IngredientCategoriesListFilters } from "@/types/ingredients/ingredientCategories";
import { ListConfig } from "@/types/_shared/list";
import { WhereOperators } from "@/types/_shared/queries";
import { CRUDQueries } from "../_shared/crud";
import { Field } from "../_shared/components/models/field";
import { SelectListQuery } from "../_shared/models/list/selectList";
import { SelectCountQuery } from "../_shared/models/list/selectCount";
import { SelectQuery } from "../_shared/models/select";
import { WheresGenerator } from "../_shared/components/generators/wheres";

export class IngredientCategoriesQueries extends CRUDQueries {
  constructor() {
    super(
      "ingredient_categories",
      [new Field({ name: "*" })],
      ["name"],
      ["name"]
    );
  }

  getSelectList(config: ListConfig<IngredientCategoriesListFilters>) {
    const { filters } = config;
    return new SelectListQuery(this.getSelectAll(filters), config).query;
  }

  getSelectCount(filters: IngredientCategoriesListFilters) {
    return new SelectCountQuery(this.getSelectAll(filters)).query;
  }

  private getSelectAll(filters: IngredientCategoriesListFilters) {
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
