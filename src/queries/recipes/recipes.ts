import { ListQueryBuilder } from "@/base/queries/builders/list";
import { HavingCollection } from "@/base/queries/collections/having";
import { Field } from "@/base/queries/models/field";
import { Join } from "@/base/queries/models/join";
import { Where } from "@/base/queries/models/where";
import { Queries } from "@/base/queries/queries";
import { ListConfig } from "@/types/base/list";
import { WhereOperators } from "@/types/base/queries";
import { RecipesListFilters } from "@/types/recipes/recipes";

export class RecipesQueries extends Queries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = [
      "recipe_name",
      "preparation_time",
      "tags",
      "cookidoo_link",
    ];

    const fieldsToUpdate = [
      "recipe_name",
      "preparation_time",
      "tags",
      "cooked_date",
      "cookidoo_link",
    ];

    super({
      tableName: "recipes",
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
    });
  }

  getSelectList(config: ListConfig<RecipesListFilters>) {
    const { filters } = config;
    const queryBuilder = this.getListQueryBuilderWithFilters(filters);
    queryBuilder.build(config);

    return queryBuilder.query;
  }

  getSelectAll(filters: RecipesListFilters) {
    return this.getListQueryBuilderWithFilters(filters).query;
  }

  getSelectCount(filters: RecipesListFilters) {
    return `SELECT COUNT(*) FROM (${this.getSelectAll(filters)}) AS recipes`;
  }

  private getListQueryBuilderWithFilters(filters: RecipesListFilters) {
    let selectQuery = this.getSelect({
      fields: [
        new Field({
          table: "recipes",
          name: "*",
        }),
        new Field({
          name: "GROUP_CONCAT(ingredient_units.ingredient_id)",
          alias: "ingredient_ids",
        }),
      ],
      joins: [
        new Join({
          type: "LEFT JOIN",
          table: "recipe_ingredients",
          on: "recipes.id",
          equals: "recipe_id",
        }),
        new Join({
          type: "LEFT JOIN",
          table: "ingredient_units",
          on: "recipe_ingredients.ingredient_unit_id",
          equals: "id",
        }),
      ],
    });

    const queryBuilder = new ListQueryBuilder(selectQuery);
    const { searchPhrase, tags, ingredientIds } = filters;
    queryBuilder.produceMultipleValuesFilterWheres(
      "tags",
      tags,
      WhereOperators.AND
    );
    queryBuilder.produceMultipleFieldsFilterWheres(
      ["recipe_name"],
      searchPhrase,
      WhereOperators.OR
    );
    queryBuilder.produceFilterWheres();
    queryBuilder.query += " GROUP BY recipes.id";
    queryBuilder.query += this.getFilterByIngredientIdsQuery(ingredientIds);

    return queryBuilder;
  }

  private getFilterByIngredientIdsQuery(ingredientIds?: number[]) {
    if (!ingredientIds || ingredientIds.length === 0) {
      return "";
    }

    const wheres = ingredientIds.flatMap((id, index, array) => {
      const where = new Where({
        findInSet: { value: id, set: "ingredient_ids" },
      });

      if (array.length - 1 === index) {
        return where;
      }

      return [where, WhereOperators.AND];
    });

    return " " + new HavingCollection(wheres).prepare();
  }

  getUpdateKcal() {
    return this.getUpdate(["kcal"]);
  }
}
