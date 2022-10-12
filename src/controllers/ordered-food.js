import orderedFoodQueries from "../queries/ordered-food.js";
import Database from "../config/database.js";
import { getListWithPagination } from "../utils/list.js";
import { getTagsWithCount } from "../utils/tags.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";

class OrderedFoodController {
  static getOrderedFoodListWithPagination(request) {
    return getListWithPagination(
      orderedFoodQueries.select,
      orderedFoodQueries.selectCount,
      request
    );
  }

  static getOrderedFoodTags(request) {
    return getTagsWithCount(request, orderedFoodQueries.selectTags);
  }

  static getOrderedFoodById(id) {
    return new Promise((resolve, reject) => {
      Database.sendQuery(orderedFoodQueries.selectById, [id])
        .then((results) => resolve(convertKeysToCamelCase(results[0])))
        .catch((error) => reject(error));
    });
  }
}

export default OrderedFoodController;
