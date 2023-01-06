import { ListConfig } from "@/interfaces/base/list";

export class DatabaseQueryHelper {
  getQueryToFiltersByTags(tags?: string) {
    if (!tags) {
      return "";
    }

    const tagsArray = tags?.split(",");
    let query = "";

    tagsArray.forEach((tag) => {
      query += "AND tags COLLATE utf8mb4_general_ci LIKE '%" + tag + "%'\n";
    });

    return query;
  }

  getQueryToOrderBy(sortAttribute?: string, sortDirection?: string) {
    if (!sortAttribute || !sortDirection) {
      return "";
    }
    return "ORDER BY " + sortAttribute + " " + sortDirection + "\n";
  }

  getQueryToFilterBySearchPhrase(searchPhrase: string, columns?: string[]) {
    if (!columns) {
      return "";
    }

    return (
      columns.reduce((accum, column, index) => {
        if (index === 0) {
          return (
            accum +
            column +
            " COLLATE utf8mb4_general_ci LIKE '" +
            searchPhrase +
            "'\n"
          );
        }

        return (
          accum +
          "OR " +
          column +
          " COLLATE utf8mb4_general_ci LIKE '" +
          searchPhrase +
          "'\n"
        );
      }, " WHERE\n(\n") + ")\n"
    );
  }

  extendQueryToSelectList(
    queryToSelectList: string,
    {
      sortAttribute,
      sortDirection,
      tags,
      size,
      offset,
      searchPhrase,
    }: ListConfig,
    searchPhraseColumns?: string[]
  ) {
    return (
      queryToSelectList +
      this.getQueryToFilterBySearchPhrase(
        searchPhrase || "",
        searchPhraseColumns
      ) +
      this.getQueryToFiltersByTags(tags) +
      this.getQueryToOrderBy(sortAttribute, sortDirection) +
      "LIMIT " +
      size +
      "\n" +
      "OFFSET " +
      offset
    );
  }
}
