import { Queries } from "@/base/queries/queries";
import { Field } from "@/base/queries/models/field";

export class RecipeStepsQueries extends Queries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = ["recipe_id", "number", "instructions"];
    const fieldsToUpdate = ["recipe_id", "number", "instructions"];

    super({
      tableName: "recipe_steps",
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
    });
  }

  getSelectByRecipeId() {
    return this.getSelectById({ id: "recipe_id" });
  }
}
