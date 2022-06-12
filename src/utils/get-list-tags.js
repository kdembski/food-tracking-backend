import { addTagsFilteringQuery } from "../utils/get-list-with-pagination.js";
import Database from "../config/database.js";
import lodash from "lodash";

const getListTags = (request, selectTagsQuery) => {
  let search = request?.query?.search;
  search = search ? "%" + search + "%" : "%";
  const tags = request?.query?.tags;
  selectTagsQuery = addTagsFilteringQuery(selectTagsQuery, tags);

  return new Promise((resolve, reject) => {
    Database.sendQuery(selectTagsQuery, [search])
      .then((results) => {
        let allTags = [];

        results.forEach((record) => {
          const recordTags = record.tags.split(",");
          allTags = lodash.union(allTags, recordTags);
        });

        resolve(allTags.sort().join(","));
      })
      .catch((error) => reject(error));
  });
};

export default getListTags;
