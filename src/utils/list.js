import { getRequestQueryParameters } from "./request-helpers.js";
import { getFliterByTagsQuery, getOrderByQuery } from "./query-helpers.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";
import Database from "../config/database.js";

export const getListWithPagination = (selectList, selectListCount, request) => {
  const { size, page, sortAttribute, sortDirection, searchPhrase, tags } =
    getRequestQueryParameters(request);

  const offset = (page - 1) * size;

  selectList = extendSelectListQuery(
    selectList,
    sortAttribute,
    sortDirection,
    tags,
    size,
    offset
  );

  selectListCount = extendSelectListCountQuery(selectListCount, tags);

  return new Promise((resolve, reject) => {
    getListData(selectList, searchPhrase)
      .then((data) => {
        getListPagination(
          selectListCount,
          searchPhrase,
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

const extendSelectListQuery = (
  selectList,
  sortAttribute,
  sortDirection,
  tags,
  size,
  offset
) => {
  return (
    selectList +
    "\n" +
    getFliterByTagsQuery(tags) +
    getOrderByQuery(sortAttribute, sortDirection) +
    "LIMIT " +
    size +
    "\n" +
    "OFFSET " +
    offset
  );
};

const extendSelectListCountQuery = (selectListCount, tags) => {
  return selectListCount + "\n" + getFliterByTagsQuery(tags);
};

const getListData = (selectList, search) => {
  return new Promise((resolve, reject) => {
    Database.sendQuery(selectList, [search])
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
