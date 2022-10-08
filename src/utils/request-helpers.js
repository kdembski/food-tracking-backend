import loadsh from "lodash";

export const getRequestQueryParameters = (request) => {
  let size = request?.query?.size || 10;
  size = parseInt(size);

  let page = request?.query?.page || 1;
  page = parseInt(page);

  const sortAttribute = loadsh.snakeCase(request?.query?.attr);
  const sortDirection = request?.query?.dir;

  let searchPhrase = request?.query?.search;
  searchPhrase = searchPhrase ? "%" + searchPhrase + "%" : "%";

  const tags = request?.query?.tags;

  return {
    size,
    page,
    sortAttribute,
    sortDirection,
    searchPhrase,
    tags,
  };
};
