import { addTagsFilteringQuery } from "../utils/get-list-with-pagination.js";
import Database from "../config/database.js";
import lodash from "lodash";

const getTagsWithCount = (allTagNames) => {
  return allTagNames.reduce((accum, tagName) => {
    const duplicateIndex = accum.findIndex((tag) => tag.name === tagName);
    const isDuplicate = duplicateIndex !== -1;

    if (isDuplicate) {
      accum[duplicateIndex].count++;
    } else {
      accum.push({
        name: tagName,
        count: 1,
      });
    }
    return accum;
  }, []);
};

const getListTags = (request, selectTagsQuery) => {
  let search = request?.query?.search;
  search = search ? "%" + search + "%" : "%";
  const tags = request?.query?.tags;
  selectTagsQuery = addTagsFilteringQuery(selectTagsQuery, tags);

  return new Promise((resolve, reject) => {
    Database.sendQuery(selectTagsQuery, [search])
      .then((results) => {
        let allTagNames = [];

        results.forEach((record) => {
          const recordTags = record.tags.split(",");
          allTagNames = lodash.concat(allTagNames, recordTags);
        });

        resolve(
          getTagsWithCount(allTagNames).sort((a, b) => b.count - a.count)
        );
      })
      .catch((error) => reject(error));
  });
};

export default getListTags;
