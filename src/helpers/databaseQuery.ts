export class DatabaseQueryHelper {
  getQueryToFiltersByTags = (tags?: string) => {
    if (!tags) {
      return "";
    }

    const tagsArray = tags?.split(",");
    let query = "";

    tagsArray.forEach((tag) => {
      query += "AND tags COLLATE utf8mb4_general_ci LIKE '%" + tag + "%'\n";
    });

    return query;
  };

  getQueryToOrderBy = (sortAttribute?: string, sortDirection?: string) => {
    if (!sortAttribute || !sortDirection) {
      return "";
    }
    return "ORDER BY " + sortAttribute + " " + sortDirection + "\n";
  };

  extendQueryToSelectList(
    queryToSelectList: string,
    sortAttribute: string,
    sortDirection: string,
    tags: string,
    size: number,
    offset: number
  ) {
    return (
      queryToSelectList +
      "\n" +
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
