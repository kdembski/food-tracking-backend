import orderedFoodQueries from "../queries/ordered-food.js";
import Database from "../config/database.js";
import CalendarItemController from "./calendar-item/controller.js";
import { getListWithPagination } from "../utils/list.js";
import { getTagsWithCount } from "../utils/tags.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";
import { isEqual } from "date-fns";

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

  static addOrderedFood(data) {
    return Database.sendQuery(orderedFoodQueries.insert, [
      data.foodName,
      data.placeName,
      data.tags,
      data.placeLink,
    ]);
  }

  static updateOrderedFood(id, data) {
    return Database.sendQuery(orderedFoodQueries.update, [
      data.foodName,
      data.placeName,
      data.tags,
      data.placeLink,
      data.orderDate,
      id,
    ]);
  }

  static updateOrderedFoodOrderDate(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const orderedFood = await this.getOrderedFoodById(id);
        const lastDate =
          await CalendarItemController.getOrderedFoodLastOrderDate(id);

        if (isEqual(lastDate, orderedFood.orderDate)) {
          return resolve();
        }

        orderedFood.orderDate = null;
        if (lastDate) {
          orderedFood.orderDate = lastDate;
        }

        await this.updateOrderedFood(id, orderedFood);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default OrderedFoodController;
