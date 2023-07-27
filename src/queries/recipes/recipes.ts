import { ListConfig } from "@/types/_shared/list";
import { Field } from "../_shared/components/models/field";
import { CRUDQueries } from "../_shared/crud";
import { SelectListQuery } from "../_shared/models/list/selectList";
import { RecipesListFilters } from "@/types/recipes/recipes";
import { SelectCountQuery } from "../_shared/models/list/selectCount";
import { SelectQuery } from "../_shared/models/select";
import { Where } from "../_shared/components/models/where";
import { WhereOperators } from "@/types/_shared/queries";
import { HavingCollection } from "../_shared/components/collections/having";
import { UpdateQuery } from "../_shared/models/crud/update";
import { Join } from "../_shared/components/models/join";
import { WheresGenerator } from "../_shared/components/generators/wheres";

export class RecipesQueries extends CRUDQueries {
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

    super("recipes", fieldsToSelect, fieldsToInsert, fieldsToUpdate);
  }

  getSelectList(config: ListConfig<RecipesListFilters>) {
    const { filters } = config;
    return new SelectListQuery(this.getSelectAll(filters), config).query;
  }

  getSelectCount(filters: RecipesListFilters) {
    return new SelectCountQuery(this.getSelectAll(filters)).query;
  }

  getSelectOptions(labelField: string) {
    return new SelectQuery(this.tableName, [
      new Field({ name: "id" }),
      new Field({ name: labelField }),
    ]).query;
  }

  getSelectAll(filters: RecipesListFilters) {
    const { ingredientIds } = filters;

    let query = new SelectQuery(
      this.tableName,
      [
        new Field({
          table: "recipes",
          name: "*",
        }),
        new Field({
          name: "GROUP_CONCAT(ingredient_units.ingredient_id)",
          alias: "ingredient_ids",
        }),
      ],
      this.getFiltersWheres(filters),
      [
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
      ]
    ).query;

    query += " GROUP BY recipes.id";
    query += this.getFilterByIngredientIdsClause(ingredientIds);

    return query;
  }

  private getFiltersWheres(filters: RecipesListFilters) {
    const { searchPhrase, tags } = filters;
    const tagsWheres = new WheresGenerator().generateMultipleValues(
      tags,
      "tags",
      WhereOperators.AND
    );
    const searchPhraseWheres = new WheresGenerator().generateMultipleFields(
      ["recipe_name"],
      searchPhrase,
      WhereOperators.OR
    );

    return [...tagsWheres, WhereOperators.AND, ...searchPhraseWheres];
  }

  private getFilterByIngredientIdsClause(ingredientIds?: number[]) {
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
    return new UpdateQuery(
      this.tableName,
      ["kcal"],
      [new Where({ field: "id", equals: "?" })]
    ).query;
  }
}
