import orderedFoodModel from "../models/ordered-food.js";
import getListWithPagination from "../utils/get-list-with-pagination.js";
import getListTags from "../utils/get-list-tags.js";

class OrderedFoodController {
  static setRoutes(router) {
    router.get("/ordered", this.#getOrderedFoodListWithPagination);
    router.get("/ordered/tags", this.#getOrderedFoodListTags);
  }

  static #getOrderedFoodListWithPagination(request, response) {
    getListWithPagination(
      orderedFoodModel.selectOrderedFoodList,
      orderedFoodModel.selectOrderedFoodCount,
      request
    )
      .then((results) => response.json(results))
      .catch((error) => response.send(error));
  }

  static #getOrderedFoodListTags(request, response) {
    getListTags(request, orderedFoodModel.selectOrderedFoodTags)
      .then((results) => response.json({ orderedFoodTags: results }))
      .catch((error) => response.send(error));
  }
}

export default OrderedFoodController;
