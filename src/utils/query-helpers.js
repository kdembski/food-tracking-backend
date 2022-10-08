export const getFliterByTagsQuery = (tags) => {
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

export const getOrderByQuery = (sortAttribute, sortDirection) => {
  if (!sortAttribute || !sortDirection) {
    return "";
  }
  return "ORDER BY " + sortAttribute + " " + sortDirection + "\n";
};
