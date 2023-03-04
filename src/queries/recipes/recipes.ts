import { Field } from "@/base/queries/models/field";
import { Queries } from "@/base/queries/queries";
import { TagsConfig } from "@/types/base/tags";

export class RecipesQueries extends Queries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = [
      "recipe_name",
      "preparation_time",
      "tags",
      "cookidoo_link",
    ];

    const fieldsToUpdate = [
      "recipe_name",
      "preparation_time",
      "tags",
      "cooked_date",
      "cookidoo_link",
    ];

    super({
      tableName: "recipes",
      searchPhraseFields: ["recipe_name"],
      fieldsToSelect,
      fieldsToInsert,
      fieldsToUpdate,
    });
  }

  getSelectTags({ searchPhrase, tags }: TagsConfig) {
    const wheres = this.listHelper.buildListWheres(searchPhrase, tags);

    return this.getSelect({
      fields: [new Field({ name: "tags" })],
      wheres,
    });
  }

  getSelectNames(searchPhrase: string, tags: string) {
    const wheres = this.listHelper.buildListWheres(searchPhrase, tags);

    return this.getSelect({
      fields: [new Field({ name: "recipe_name" })],
      wheres,
    });
  }

  getUpdateKcal() {
    return this.getUpdate(["kcal"]);
  }
}
