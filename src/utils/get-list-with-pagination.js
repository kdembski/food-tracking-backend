import db from "../config/database.js";
import { convertKeysToCamelCase } from "./convert-keys-to-camel-case.js";

const getListData = (selectList, search, size, offset) => {
  return new Promise((resolve, reject) => {
    db.sendQuery(
      selectList,
      (error, results) => {
        error ? reject(error) : resolve(convertKeysToCamelCase(results));
      },
      [search, size, offset]
    );
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
    db.sendQuery(
      selectListCount,
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        const count = parseInt(results[0]["COUNT(*)"]);
        resolve({
          currentPage: page,
          totalPages: Math.ceil(count / size),
          firstRecord: offset + 1,
          lastRecord: offset + listLength,
          totalRecords: count,
        });
      },
      [search]
    );
  });
};

const getListWithPagination = async (
  selectList,
  selectListCount,
  request,
  response
) => {
  let size = request?.query?.size || 10;
  size = parseInt(size);

  let page = request?.query?.page || 1;
  page = parseInt(page);

  let search = request?.query?.search;
  search = search ? "%" + search + "%" : "%";

  const offset = (page - 1) * size;

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
          response.json({ data, pagination });
        })
        .catch((error) => response.send(error));
    })
    .catch((error) => response.send(error));
};

export default getListWithPagination;
