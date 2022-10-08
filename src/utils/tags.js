import Database from "../config/database.js";
import lodash from "lodash";
import { getRequestQueryParameters } from "./request-helpers.js";
import { getFliterByTagsQuery } from "./query-helpers.js";

export const getTagsWithCount = (request, selectTagsQuery) => {
  return new Promise((resolve, reject) => {
    getTags(request, selectTagsQuery)
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

export const getTags = (request, selectTagsQuery) => {
  const { searchPhrase, tags } = getRequestQueryParameters(request);
  selectTagsQuery = selectTagsQuery + "\n" + getFliterByTagsQuery(tags);

  return new Promise((resolve, reject) => {
    Database.sendQuery(selectTagsQuery, [searchPhrase])
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
