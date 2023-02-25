import { Field } from "@/base/queries/models/field";
import { Join } from "@/base/queries/models/join";
import { Queries } from "@/base/queries/queries";

export class RecipeIngredientsQueries extends Queries {
  constructor() {
    const joins = [
      new Join({
        table: "ingredient_units",
        on: "recipe_ingredients.ingredient_unit_id",
        equals: "id",
      }),
      new Join({
        table: "units",
        on: "ingredient_units.unit_id",
        equals: "id",
      }),
      new Join({
        table: "ingredients",
        on: "ingredient_units.ingredient_id",
        equals: "id",
      }),
    ];

    const fieldsToSelect = [
      new Field({
        table: "recipe_ingredients",
        name: "*",
      }),
      new Field({
        table: "ingredients",
        name: "name",
        alias: "ingredient_name",
      }),
      new Field({
        table: "units",
        name: "shortcut",
        alias: "unit_shortcut",
      }),
      new Field({
        table: "ingredient_units",
        name: "*",
      }),
    ];

    const fieldsToInsert = ["recipe_id", "ingredient_unit_id", "amount"];
    const fieldsToUpdate = ["recipe_id", "ingredient_unit_id", "amount"];

    super({
      tableName: "recipe_ingredients",
      joins,
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
    });
  }

  getSelectByRecipeId() {
    return this.getSelectById({ id: "recipe_id" });
  }
}
