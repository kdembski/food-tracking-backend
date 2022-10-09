import { getRequestQueryParameters } from "./request-helpers.js";
import { getQueryToFiltersByTags, getQueryToOrderBy } from "./query-helpers.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";
import Database from "../config/database.js";

export const getListWithPagination = (
  queryToSelectList,
  queryToSelectListCount,
  request
) => {
  const { size, page, sortAttribute, sortDirection, searchPhrase, tags } =
    getRequestQueryParameters(request);

  const offset = (page - 1) * size;

  queryToSelectList = extendQueryToSelectList(
    queryToSelectList,
    sortAttribute,
    sortDirection,
    tags,
    size,
    offset
  );

  queryToSelectListCount = extendQueryToSelectListCount(
    queryToSelectListCount,
    tags
  );

  return new Promise(async (resolve, reject) => {
    try {
      const data = await getListData(queryToSelectList, searchPhrase);
      const pagination = await getListPagination(
        queryToSelectListCount,
        searchPhrase,
        page,
        size,
        offset,
        data?.length
      );
      resolve({ data, pagination });
    } catch (error) {
      reject(error);
    }
  });
};

const extendQueryToSelectList = (
  queryToSelectList,
  sortAttribute,
  sortDirection,
  tags,
  size,
  offset
) => {
  return (
    queryToSelectList +
    "\n" +
    getQueryToFiltersByTags(tags) +
    getQueryToOrderBy(sortAttribute, sortDirection) +
    "LIMIT " +
    size +
    "\n" +
    "OFFSET " +
    offset
  );
};

const extendQueryToSelectListCount = (queryToSelectListCount, tags) => {
  return queryToSelectListCount + "\n" + getQueryToFiltersByTags(tags);
};

const getListData = (queryToSelectList, search) => {
  return new Promise((resolve, reject) => {
    Database.sendQuery(queryToSelectList, [search])
      .then((results) => resolve(convertKeysToCamelCase(results)))
      .catch((error) => reject(error));
  });
};

const getListPagination = (
  queryToSelectListCount,
  search,
  page,
  size,
  offset,
  listLength
) => {
  return new Promise((resolve, reject) => {
    Database.sendQuery(queryToSelectListCount, [search])
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
