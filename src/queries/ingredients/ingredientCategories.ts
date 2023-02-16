import { Field } from "@/base/queries/models/field";
import { Queries } from "@/base/queries/queries";

export class IngredientCategoriesQueries extends Queries {
  constructor() {
    super({
      tableName: "ingredient_categories",
      fieldsToSelect: [new Field({ name: "*" })],
      fieldsToInsert: ["name"],
      fieldsToUpdate: ["name"],
      searchPhraseFields: ["name"],
    });
  }
}
