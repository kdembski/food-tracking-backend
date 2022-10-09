import Database from "../config/database.js";
import lodash from "lodash";
import { getRequestQueryParameters } from "./request-helpers.js";
import { getQueryToFiltersByTags } from "./query-helpers.js";

export const getTagsWithCount = (request, queryToSelectTags) => {
  return new Promise((resolve, reject) => {
    getTags(request, queryToSelectTags)
      .then((result) => {
        resolve(countTags(result).sort((a, b) => b.count - a.count));
      })
      .catch((error) => reject(error));
  });
};

const countTags = (allTags) => {
  return allTags.reduce((accum, tagName) => {
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

export const getTags = (request, queryToSelectTags) => {
  const { searchPhrase, tags } = getRequestQueryParameters(request);
  queryToSelectTags = queryToSelectTags + "\n" + getQueryToFiltersByTags(tags);

  return new Promise((resolve, reject) => {
    Database.sendQuery(queryToSelectTags, [searchPhrase])
      .then((results) => {
        let allTags = [];

        results.forEach((record) => {
          const recordTags = record.tags.split(",");
          allTags = lodash.concat(allTags, recordTags);
        });

        resolve(allTags);
      })
      .catch((error) => reject(error));
  });
};
