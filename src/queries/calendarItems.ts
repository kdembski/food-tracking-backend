import { Field } from "@/base/queries/models/field";
import { Join } from "@/base/queries/models/join";
import { Where } from "@/base/queries/models/where";
import { Queries } from "@/base/queries/queries";
import { formatISO9075 } from "date-fns";

export class CalendarItemsQueries extends Queries {
  constructor() {
    const joins = [
      new Join({
        type: "LEFT JOIN",
        table: "recipes",
        on: "calendar_items.recipe_id",
        equals: "id",
      }),
      new Join({
        type: "LEFT JOIN",
        table: "ordered_food",
        on: "calendar_items.ordered_food_id",
        equals: "id",
      }),
    ];

    const fieldsToSelect = [
      new Field({
        table: "calendar_items",
        name: "*",
      }),
      new Field({
        table: "recipes",
        name: "recipe_name",
      }),
      new Field({
        table: "recipes",
        name: "tags",
        alias: "recipe_tags",
      }),
      new Field({
        table: "ordered_food",
        name: "food_name",
        alias: "ordered_food_name",
      }),
      new Field({
        table: "ordered_food",
        name: "tags",
        alias: "ordered_food_tags",
      }),
    ];

    const fieldsToInsert = [
      "date",
      "recipe_id",
      "ordered_food_id",
      "sort_order",
    ];
    const fieldsToUpdate = [
      "date",
      "recipe_id",
      "ordered_food_id",
      "sort_order",
    ];

    super({
      tableName: "calendar_items",
      joins,
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
    });
  }

  getSelectDatesByRecipeId(from: Date, to: Date) {
    return this.getSelectDatesById(from, to, "recipe_id");
  }

  getSelectDatesByOrderedFoodId(from: Date, to: Date) {
    return this.getSelectDatesById(from, to, "ordered_food_id");
  }

  getSelectDatesById(from: Date, to: Date, id: string) {
    const fields = [new Field({ name: "date" })];
    const wheres = [
      new Where({
        field: "date",
        between: { from: formatISO9075(from), to: formatISO9075(to) },
      }),
    ];

    return this.getSelectById({ fields, wheres, id });
  }

  getDateRangeSelect(from: Date, to: Date) {
    const wheres = [
      new Where({
        field: "date",
        between: { from: formatISO9075(from), to: formatISO9075(to) },
      }),
    ];

    return this.getSelect({ wheres });
  }
}
