import lodash from "lodash";

export const convertKeysToCamelCase = (data) => {
  if (lodash.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      data[i] = convertKeysToCamelCase(data[i]);
    }
    return data;
  }

  let camelCasedObject = {};
  for (const [key, value] of Object.entries(data)) {
    camelCasedObject[lodash.camelCase(key)] = value;
  }

  return camelCasedObject;
};
