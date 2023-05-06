import { ListQueryBuilder } from "@/base/queries/builders/list";
import { Field } from "@/base/queries/models/field";
import { Queries } from "@/base/queries/queries";
import { ListConfig } from "@/types/base/list";
import { WhereOperators } from "@/types/base/queries";
import { IngredientCategoriesListFilters } from "@/types/ingredients/ingredientCategories";

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
