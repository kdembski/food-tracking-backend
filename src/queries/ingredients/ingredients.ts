import { Queries } from "@/base/queries/queries";
import { Field } from "@/base/queries/models/field";
import { Join } from "@/base/queries/models/join";

export class IngredientsQueries extends Queries {
  constructor() {
    const joins = [
      new Join({
        table: "ingredient_categories",
        on: "ingredients.category_id",
        equals: "id",
      }),
    ];

    const fieldsToSelect = [
      new Field({
        table: "ingredients",
        name: "*",
      }),
      new Field({
        table: "ingredient_categories",
        name: "name",
        alias: "category_name",
      }),
    ];

    const fieldsToInsert = ["name", "category_id"];
    const fieldsToUpdate = ["name", "category_id"];
    const searchPhraseFields = ["ingredients.name"];

    super({
      tableName: "ingredients",
      joins,
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
      searchPhraseFields,
    });
  }
}
