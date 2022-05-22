import Database from "../config/database.js";
import { convertKeysToCamelCase } from "./convert-keys-to-camel-case.js";

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

const getListWithPagination = (selectList, selectListCount, request) => {
  let size = request?.query?.size || 10;
  size = parseInt(size);

  let page = request?.query?.page || 1;
  page = parseInt(page);

  let search = request?.query?.search;
  search = search ? "%" + search + "%" : "%";

  const offset = (page - 1) * size;

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
