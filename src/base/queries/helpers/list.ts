import { WhereOperators, WhereParenthesis } from "@/types/base/queries";
import { Where } from "../models/where";

export class ListQueryHelper {
  private searchPhraseFields: string[];

  constructor(searchPhraseFields: string[]) {
    this.searchPhraseFields = searchPhraseFields;
  }

  buildListWheres(searchPhrase: string, tags: string) {
    const tagsWheres = this.buildTagsWheres(tags);
    const searchPhraseWheres = this.buildSearchPhraseWheres(searchPhrase);

    if (tagsWheres.length > 0 && searchPhraseWheres.length > 0) {
      return [...tagsWheres, WhereOperators.AND, ...searchPhraseWheres];
    }

    return [...tagsWheres, ...searchPhraseWheres];
  }

  private buildTagsWheres(tags: string) {
    if (!tags) {
      return [];
    }

    return tags.split(",").flatMap((tag, index, array) => {
      const where = new Where({
        field: "tags",
        like: "%" + tag + "%",
      });

      if (array.length - 1 === index) {
        return where;
      }

      return [where, WhereOperators.AND];
    });
  }

  private buildSearchPhraseWheres(searchPhrase: string) {
    if (!searchPhrase && this.searchPhraseFields.length > 0) {
      return [];
    }

    const wheres = this.searchPhraseFields.flatMap((field, index, array) => {
      const where = new Where({
        field: field,
        like: "%" + searchPhrase + "%",
      });

      if (array.length - 1 === index) {
        return where;
      }

      return [where, WhereOperators.OR];
    });

    return [WhereParenthesis.LEFT, ...wheres, WhereParenthesis.RIGHT];
  }

  buildOrderBy(attr?: string, dir?: string) {
    if (!attr || !dir) {
      return "";
    }
    return `ORDER BY ${attr} ${dir.toUpperCase()}`;
  }
}
