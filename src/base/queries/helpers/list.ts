import { Where } from "../models/where";

export class ListQueryHelper {
  private searchPhraseFields: string[];

  constructor(searchPhraseFields: string[]) {
    this.searchPhraseFields = searchPhraseFields;
  }

  buildListWheres(searchPhrase: string, tags: string) {
    const tagsWheres = this.buildTagsWheres(tags);
    const searchPhraseWheres = this.buildSearchPhraseWheres(searchPhrase);

    return [...searchPhraseWheres, ...tagsWheres];
  }

  private buildTagsWheres(tags: string) {
    if (!tags) {
      return [];
    }

    return tags.split(",").map(
      (tag) =>
        new Where({
          field: "tags",
          like: "%" + tag + "%",
          operator: "AND",
        })
    );
  }

  private buildSearchPhraseWheres(searchPhrase: string) {
    if (!searchPhrase) {
      return [];
    }

    return this.searchPhraseFields?.map(
      (field) =>
        new Where({
          field: field,
          like: "%" + searchPhrase + "%",
          operator: "OR",
        })
    );
  }

  buildOrderBy(attr?: string, dir?: string) {
    if (!attr || !dir) {
      return "";
    }
    return `ORDER BY ${attr} ${dir.toUpperCase()}`;
  }
}
