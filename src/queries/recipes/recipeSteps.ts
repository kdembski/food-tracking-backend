import { Field } from "../_shared/models/field";
import { Queries } from "../_shared/models/queries";

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
