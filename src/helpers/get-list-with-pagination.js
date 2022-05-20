import { sendQuery } from "../config/database.js";
import { convertKeysToCamelCase } from "./convert-keys-to-camel-case.js";

const getListData = (selectList, search, size, offset) => {
  return new Promise((resolve, reject) => {
    sendQuery(
      selectList,
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(convertKeysToCamelCase(results));
      },
      [search, parseInt(size), parseInt(offset)]
    );
  });
};

const getListPagination = (selectListCount, page, size, offset) => {
  return new Promise((resolve, reject) => {
    sendQuery(selectListCount, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      const count = results[0]["COUNT(*)"];
      let lastRecord = offset + parseInt(size);
      lastRecord = lastRecord > count ? count : lastRecord;

      resolve({
        currentPage: page,
        totalPages: Math.ceil(count / size),
        firstRecord: offset + 1,
        lastRecord: lastRecord,
        totalRecords: count,
      });
    });
  });
};

const getListWithPagination = async (
  selectList,
  selectListCount,
  request,
  response
) => {
  const size = request.query.size || 10;
  const page = request.query.page || 1;
  const offset = (page - 1) * size;
  let search = request.query.search;
  search = search ? "%" + search + "%" : "%";

  let results = {};
  results.data = await getListData(selectList, search, size, offset);
  results.pagination = await getListPagination(
    selectListCount,
    page,
    size,
    offset
  );

  response.json(results);
};

export default getListWithPagination;
