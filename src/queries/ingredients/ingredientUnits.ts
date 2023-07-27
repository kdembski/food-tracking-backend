import { WhereOperators } from "@/types/_shared/queries";
import { Field } from "../_shared/components/models/field";
import { Join } from "../_shared/components/models/join";
import { CRUDQueries } from "../_shared/crud";
import { SelectByIdQuery } from "../_shared/models/crud/selectById";
import { SelectQuery } from "../_shared/models/select";
import { Where } from "../_shared/components/models/where";

export class IngredientUnitsQueries extends CRUDQueries {
  constructor() {
    const joins = [
      new Join({
        table: "units",
        on: "ingredient_units.unit_id",
        equals: "id",
      }),
    ];

    const fieldsToSelect = [
      new Field({
        table: "ingredient_units",
        name: "*",
      }),
      new Field({
        table: "units",
        name: "name",
        alias: "unit_name",
      }),
      new Field({
        table: "units",
        name: "shortcut",
        alias: "unit_shortcut",
      }),
    ];

    const fieldsToInsert = [
      "ingredient_id",
      "unit_id",
      "kcal_per_unit",
      "is_primary",
      "converter_to_primary",
    ];

    const fieldsToUpdate = [
      "ingredient_id",
      "unit_id",
      "kcal_per_unit",
      "is_primary",
      "converter_to_primary",
    ];

    super(
      "ingredient_units",
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
      joins
    );
  }

  getSelectByIngredientId() {
    return this.getSelectById("ingredient_id");
  }

  getSelectByIngredientIdAndUnitId(ingredientId: number, unitId: number) {
    return new SelectQuery(
      this.tableName,
      this.fieldsToSelect,
      [
        new Where({
          field: "ingredient_id",
          equals: ingredientId,
        }),
        WhereOperators.AND,
        new Where({
          field: "unit_id",
          equals: unitId,
        }),
      ],
      this.joins
    ).query;
  }
}
