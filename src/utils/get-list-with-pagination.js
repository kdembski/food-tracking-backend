import Database from "../config/database.js";
import { convertKeysToCamelCase } from "./convert-keys-to-camel-case.js";
import loadsh from "lodash";

const getListData = (selectList, search, size, offset) => {
  return new Promise((resolve, reject) => {
    Database.sendQuery(selectList, [search, size, offset])
      .then((results) => resolve(convertKeysToCamelCase(results)))
      .catch((error) => reject(error));
  });
};

const getListPagination = (
  selectListCount,
  search,
  page,
  size,
  offset,
  listLength
) => {
  return new Promise((resolve, reject) => {
    Database.sendQuery(selectListCount, [search])
      .then((results) => {
        const count = parseInt(results[0]["COUNT(*)"]);
        resolve({
          currentPage: page,
          totalPages: Math.ceil(count / size),
          firstRecord: offset + 1,
          lastRecord: offset + listLength,
          totalRecords: count,
        });
      })
      .catch((error) => reject(error));
  });
};

export const addOrderByToSelectListQuery = (
  selectList,
  sortAttribute,
  sortDirection
) => {
  if (!sortAttribute || !sortDirection) {
    return selectList;
  }

  selectList = selectList.split("LIMIT");

  selectList[0] += "ORDER BY " + sortAttribute + " " + sortDirection + "\n";

  return selectList[1]
    ? selectList[0] + "LIMIT" + selectList[1]
    : selectList[0];
};

export const addTagsFilteringQuery = (selectList, tags) => {
  if (!tags) {
    return selectList;
  }

  const tagsArray = tags?.split(",");
  selectList = selectList.split("ORDER");

  tagsArray.forEach((tag) => {
    selectList[0] +=
      "AND tags COLLATE utf8mb4_general_ci LIKE '%" + tag + "%'\n";
  });

  return selectList[1]
    ? selectList[0] + "ORDER" + selectList[1]
    : selectList[0];
};

const getListWithPagination = (selectList, selectListCount, request) => {
  let size = request?.query?.size || 10;
  size = parseInt(size);

  let page = request?.query?.page || 1;
  page = parseInt(page);

  const sortAttribute = loadsh.snakeCase(request?.query?.attr);
  const sortDirection = request?.query?.dir;

  let search = request?.query?.search;
  search = search ? "%" + search + "%" : "%";

  const tags = request?.query?.tags;

  const offset = (page - 1) * size;

  selectList = addOrderByToSelectListQuery(
    selectList,
    sortAttribute,
    sortDirection
  );
  selectList = addTagsFilteringQuery(selectList, tags);

  selectListCount = addTagsFilteringQuery(selectListCount, tags);

  return new Promise((resolve, reject) => {
    getListData(selectList, search, size, offset)
      .then((data) => {
        getListPagination(
          selectListCount,
          search,
          page,
          size,
          offset,
          data?.length
        )
          .then((pagination) => {
            resolve({ data, pagination });
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
};

export default getListWithPagination;
