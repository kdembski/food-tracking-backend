import { sendQuery } from "../config/database.js";

const getListData = (listQuery, search, size, offset) => {
  return new Promise((resolve, reject) => {
    sendQuery(
      listQuery,
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(results);
      },
      [search, parseInt(size), parseInt(offset)]
    );
  });
};

const getListPagination = (listCountQuery, page, size, offset) => {
  return new Promise((resolve, reject) => {
    sendQuery(listCountQuery, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      const count = results[0]["COUNT(*)"];
      let lastRecord = offset + parseInt(size);
      lastRecord = lastRecord > count ? count : lastRecord;

      resolve({
        current_page: page,
        total_pages: Math.ceil(count / size),
        first_record: offset + 1,
        last_record: lastRecord,
        total_records: count,
      });
    });
  });
};

const getListWithPagination = async (
  listQuery,
  listCountQuery,
  request,
  response
) => {
  const size = request.query.size || 10;
  const page = request.query.page || 1;
  const offset = (page - 1) * size;
  let search = request.query.search;
  search = search ? "%" + search + "%" : "%";

  let results = {};
  results.data = await getListData(listQuery, search, size, offset);
  results.pagination = await getListPagination(
    listCountQuery,
    page,
    size,
    offset
  );

  response.json(results);
};

export default getListWithPagination;
