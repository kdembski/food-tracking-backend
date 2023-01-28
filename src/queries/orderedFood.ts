import { Field } from "@/base/queries/models/field";
import { Queries } from "@/base/queries/queries";
import { TagsConfig } from "@/types/base/tags";

export class OrderedFoodQueries extends Queries {
  constructor() {
    const fieldsToSelect = [
      new Field({
        name: "*",
      }),
    ];

    const fieldsToInsert = ["food_name", "place_name", "tags", "place_link"];
    const fieldsToUpdate = [
      "food_name",
      "place_name",
      "tags",
      "place_link",
      "order_date",
    ];

    super({
      tableName: "ordered_food",
      searchPhraseFields: ["food_name", "place_name"],
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
}
