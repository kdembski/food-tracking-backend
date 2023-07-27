import { formatISO9075 } from "date-fns";
import { CRUDQueries } from "../_shared/crud";
import { Join } from "../_shared/components/models/join";
import { Field } from "../_shared/components/models/field";
import { Where } from "../_shared/components/models/where";
import { SelectByIdQuery } from "../_shared/models/crud/selectById";
import { SelectQuery } from "../_shared/models/select";

export class CalendarItemsQueries extends CRUDQueries {
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
      new Join({
        type: "LEFT JOIN",
        table: "member_calendar_items",
        on: "calendar_items.id",
        equals: "item_id",
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
      new Field({
        name: "GROUP_CONCAT(member_calendar_items.member_id)",
        alias: "member_ids",
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

    super(
      "calendar_items",
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
      joins
    );
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

    return new SelectByIdQuery(this.tableName, id, fields, wheres).query;
  }

  getDateRangeSelect(from: Date, to: Date) {
    const wheres = [
      new Where({
        field: "date",
        between: { from: formatISO9075(from), to: formatISO9075(to) },
      }),
    ];

    return (
      new SelectQuery(this.tableName, this.fieldsToSelect, wheres, this.joins)
        .query + " GROUP BY calendar_items.id"
    );
  }
}
