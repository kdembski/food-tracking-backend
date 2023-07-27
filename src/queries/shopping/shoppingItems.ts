import { Field } from "../_shared/components/models/field";
import { Join } from "../_shared/components/models/join";
import { Where } from "../_shared/components/models/where";
import { CRUDQueries } from "../_shared/crud";
import { DeleteQuery } from "../_shared/models/crud/delete";
import { SelectByIdQuery } from "../_shared/models/crud/selectById";
import { UpdateQuery } from "../_shared/models/crud/update";

export class ShoppingItemsQueries extends CRUDQueries {
  constructor() {
    const joins = [
      new Join({
        type: "LEFT JOIN",
        table: "ingredient_units",
        on: "shopping_items.ingredient_unit_id",
        equals: "id",
      }),
      new Join({
        type: "LEFT JOIN",
        table: "units",
        on: "ingredient_units.unit_id",
        equals: "id",
      }),
      new Join({
        type: "LEFT JOIN",
        table: "ingredients",
        on: "ingredient_units.ingredient_id",
        equals: "id",
      }),
      new Join({
        type: "LEFT JOIN",
        table: "shopping_custom_items",
        on: "shopping_items.custom_item_id",
        equals: "id",
      }),
      new Join({
        type: "LEFT JOIN",
        table: "ingredient_units AS primary_ingredient_units",
        on: "ingredient_units.ingredient_id",
        equals: "ingredient_id AND primary_ingredient_units.is_primary = 1",
      }),
      new Join({
        type: "LEFT JOIN",
        table: "units AS primary_units",
        on: "primary_ingredient_units.unit_id",
        equals: "id",
      }),
    ];

    const fieldsToSelect = [
      new Field({
        table: "shopping_items",
        name: "*",
      }),
      new Field({
        table: "ingredient_units",
        name: "is_primary",
      }),
      new Field({
        table: "ingredient_units",
        name: "converter_to_primary",
      }),
      new Field({
        table: "ingredients",
        name: "id",
        alias: "ingredient_id",
      }),
      new Field({
        table: "ingredients",
        name: "name",
        alias: "ingredient_name",
      }),
      new Field({
        table: "ingredients",
        name: "category_id",
        alias: "ingredient_category_id",
      }),
      new Field({
        table: "units",
        name: "shortcut",
        alias: "unit_shortcut",
      }),
      new Field({
        table: "primary_units",
        name: "shortcut",
        alias: "primary_unit_shortcut",
      }),
      new Field({
        table: "shopping_custom_items",
        name: "name",
        alias: "custom_item_name",
      }),
    ];

    const fieldsToInsert = [
      "shopping_list_id",
      "recipe_id",
      "ingredient_unit_id",
      "custom_item_id",
      "amount",
    ];
    const fieldsToUpdate = [
      "shopping_list_id",
      "recipe_id",
      "ingredient_unit_id",
      "custom_item_id",
      "amount",
    ];

    super(
      "shopping_items",
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
      joins
    );
  }

  getUpdateIsChecked() {
    return new UpdateQuery(this.tableName, ["is_checked", "checked_at"]).query;
  }

  getUpdateIsRemoved() {
    return new UpdateQuery(this.tableName, ["is_removed"]).query;
  }

  getSelectNotRemovedByShoppingListId() {
    return new SelectByIdQuery(
      this.tableName,
      "shopping_list_id",
      this.fieldsToSelect,
      [new Where({ field: "is_removed", equals: 0 })],
      this.joins
    ).query;
  }

  getSelectNotRemovedCountByShoppingListId() {
    return new SelectByIdQuery(
      this.tableName,
      "shopping_list_id",
      [new Field({ name: "COUNT(*)" })],
      [new Where({ field: "is_removed", equals: 0 })],
      this.joins
    ).query;
  }

  getDeleteByRecipeId() {
    return new DeleteQuery(this.tableName, [
      new Where({ field: "recipe_id", equals: "?" }),
    ]).query;
  }
}
