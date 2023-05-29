import { WhereOperators } from "@/types/_shared/queries";
import { Field } from "../_shared/models/field";
import { Join } from "../_shared/models/join";
import { Queries } from "../_shared/models/queries";
import { Where } from "../_shared/models/where";

export class IngredientUnitsQueries extends Queries {
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

    super({
      tableName: "ingredient_units",
      joins,
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
    });
  }

  getSelectByIngredientId() {
    return this.getSelectById({ id: "ingredient_id" });
  }

  getSelectByIngredientIdAndUnitId(ingredientId: number, unitId: number) {
    return this.getSelect({
      wheres: [
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
    });
  }
}
