import orderedFoodQueries from "../queries/ordered-food.js";
import { getListWithPagination } from "../utils/list.js";
import { getTagsWithCount } from "../utils/tags.js";

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
}

export default OrderedFoodController;
