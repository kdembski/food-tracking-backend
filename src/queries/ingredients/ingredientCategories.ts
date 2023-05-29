import { IngredientCategoriesListFilters } from "@/types/ingredients/ingredientCategories";
import { Queries } from "../_shared/models/queries";
import { Field } from "../_shared/models/field";
import { ListConfig } from "@/types/_shared/list";
import { ListQueryBuilder } from "../_shared/builders/list";
import { WhereOperators } from "@/types/_shared/queries";

export class IngredientCategoriesQueries extends Queries {
  constructor() {
    super({
      tableName: "ingredient_categories",
      fieldsToSelect: [new Field({ name: "*" })],
      fieldsToInsert: ["name"],
      fieldsToUpdate: ["name"],
    });
  }

  getSelectList(config: ListConfig<IngredientCategoriesListFilters>) {
    const { filters } = config;
    const queryBuilder = this.getListQueryBuilderWithFilters(filters);
    queryBuilder.build(config);

    return queryBuilder.query;
  }

  getSelectAll(filters: IngredientCategoriesListFilters) {
    return this.getListQueryBuilderWithFilters(filters).query;
  }

  getSelectCount(filters: IngredientCategoriesListFilters) {
    return `SELECT COUNT(*) FROM (${this.getSelectAll(
      filters
    )}) AS ingredients_categories`;
  }

  private getListQueryBuilderWithFilters(
    filters: IngredientCategoriesListFilters
  ) {
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
