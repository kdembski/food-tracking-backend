import { Field } from "../_shared/components/models/field";
import { CRUDQueries } from "../_shared/crud";

export class RecipeStepsQueries extends CRUDQueries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = ["recipe_id", "number", "instructions"];
    const fieldsToUpdate = ["recipe_id", "number", "instructions"];

    super("recipe_steps", fieldsToSelect, fieldsToInsert, fieldsToUpdate);
  }

  getSelectByRecipeId() {
    return this.getSelectById("recipe_id");
  }
}
